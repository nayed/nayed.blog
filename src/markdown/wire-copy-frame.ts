import type { ShikiTransformer } from 'shiki';
import type { Element, ElementContent } from 'hast';

/** Reads `key="value"` (or 'value') from a code fence's meta string. */
function metaValue(meta: string, key: string): string | undefined {
  const match = new RegExp(`${key}=(?:"([^"]*)"|'([^']*)')`).exec(meta);
  return match?.[1] ?? match?.[2];
}

const LANGUAGE_NAMES: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  jsx: 'JSX',
  tsx: 'TSX',
  sh: 'Shell',
  bash: 'Shell',
  shell: 'Shell',
  md: 'Markdown',
  mdx: 'MDX',
  plaintext: 'Text',
  text: 'Text',
  txt: 'Text',
};

const text = (value: string): ElementContent => ({ type: 'text', value });

/**
 * Sets each fenced code block as a framed "wire copy" exhibit:
 *
 *   ```css title="styles.css" caption="The one line that ended a decade of jokes."
 *
 * becomes a <figure> with a "WIRE COPY · styles.css" header strip, a COPY
 * button (wired up by CopyCode.astro), the highlighted <pre>, and an
 * optional caption.
 */
export function wireCopyFrame(): ShikiTransformer {
  return {
    name: 'wire-copy-frame',
    root(root) {
      const meta = this.options.meta?.__raw ?? '';
      const lang = this.options.lang;
      const title = metaValue(meta, 'title') ?? LANGUAGE_NAMES[lang] ?? lang.toUpperCase();
      const caption = metaValue(meta, 'caption');

      const pre = root.children.find((n): n is Element => n.type === 'element' && n.tagName === 'pre');
      if (!pre) return;

      const header: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['code-head'] },
        children: [
          { type: 'element', tagName: 'span', properties: {}, children: [text(`Wire Copy · ${title}`)] },
          {
            type: 'element',
            tagName: 'button',
            properties: { type: 'button', className: ['code-copy'], dataCopy: '', ariaLabel: `Copy the ${title} code` },
            children: [text('Copy')],
          },
        ],
      };

      const children: ElementContent[] = [header, pre];
      if (caption) {
        children.push({ type: 'element', tagName: 'figcaption', properties: {}, children: [text(caption)] });
      }

      root.children = [
        { type: 'element', tagName: 'figure', properties: { className: ['code-block'] }, children },
      ];
    },
  };
}
