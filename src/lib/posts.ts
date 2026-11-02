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

/**
 * First paragraphs of the post as plain text, for teasers.
 * Skips MDX imports/components, headings, images and rules.
 */
export function excerpt(post: Post, maxChars = 160): string {
  const paragraphs = (post.body ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !/^(import |<|#|!\[|---|-$|>)/.test(p));
  let text = paragraphs
    .join(' ')
    .replace(/\s+/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/~~|[_*`]/g, '')
    .replace(/'/g, '’');
  if (text.length <= maxChars) return text;
  text = text.slice(0, maxChars);
  return text.slice(0, text.lastIndexOf(' ')).replace(/[,.;:!?\s]+$/, '') + '…';
}
