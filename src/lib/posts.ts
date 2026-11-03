import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from './site';
import { toRoman } from './roman';
import { numberWord } from './words';

export type Post = CollectionEntry<'posts'>;

export interface Issue {
  post: Post;
  /** Position among all published posts, oldest first, starting at 1. Never resets. */
  number: number;
  /** Years since founding + 1. */
  volume: number;
  label: string;
}

const byDate = (a: Post, b: Post) => a.data.date.valueOf() - b.data.date.valueOf();

export const volumeOf = (date: Date) => date.getUTCFullYear() - SITE.founded + 1;
export const volumeLabel = (date: Date) => `Vol. ${toRoman(volumeOf(date))}`;

/**
 * Every post with its issue number, newest first.
 * Drafts are numbered like any other post (so numbers stay stable when one is
 * unpublished) but only returned in dev.
 */
export async function getIssues(): Promise<Issue[]> {
  const all = (await getCollection('posts')).sort(byDate);
  const issues = all.map((post, i) => {
    const volume = volumeOf(post.data.date);
    return { post, number: i + 1, volume, label: `Vol. ${toRoman(volume)} — No. ${i + 1}` };
  });
  return issues.filter((issue) => import.meta.env.DEV || !issue.post.data.draft).reverse();
}

export const postUrl = (post: Post) => `/${post.id}/`;

/**
 * The page a story is printed on, given its place in getIssues() (newest first).
 * The lead starts on the front page and continues on Page 2; each later story
 * gets the next page. Stories move back a page whenever a new one is published.
 */
export const pageOf = (position: number) => position + 2;

/** Words in the Markdown source, ignoring imports, JSX tags and URLs. */
function wordCount(post: Post): number {
  const text = (post.body ?? '')
    .replace(/^import .*$/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\]\([^)]*\)/g, ']');
  return text.split(/\s+/).filter((w) => /\w/.test(w)).length;
}

export const readingMinutes = (post: Post) => Math.max(1, Math.round(wordCount(post) / 230));

/** "Two Minutes' Reading" */
export function readingTime(post: Post): string {
  const n = readingMinutes(post);
  return `${numberWord(n)} ${n === 1 ? 'Minute’s' : 'Minutes’'} Reading`;
}

/** Straight quotes to typographic ones, as the Markdown renderer does. */
export function smartQuotes(text: string): string {
  return text
    .replace(/(^|[\s([{«—–-])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(^|[\s([{«—–-])'/g, '$1‘')
    .replace(/'/g, '’')
    .replace(/\.\.\./g, '…');
}

/**
 * The post's prose paragraphs as plain text, for teasers and the lead story.
 * Skips MDX imports and components, headings, images, quotes and rules.
 */
export function plainParagraphs(post: Post): string[] {
  return (post.body ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !/^(import |<|#|!\[|---|-$|>)/.test(p))
    .map((p) =>
      smartQuotes(
        p
          .replace(/\s+/g, ' ')
          .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
          .replace(/~~|[_*`]/g, ''),
      ),
    );
}

/** Cut at a word boundary and add an ellipsis. */
export function truncate(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const cut = text.slice(0, maxChars);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:!?\s]+$/, '') + '…';
}

/** Opening lines of the post as one plain-text run. */
export const excerpt = (post: Post, maxChars = 160) => truncate(plainParagraphs(post).join(' '), maxChars);
