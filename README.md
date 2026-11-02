# The Nayed Blog

Source of [nayed.blog](https://nayed.blog), the personal blog of Nayed Saïd Ali, set as a 1920s broadsheet.
Built with [Astro](https://astro.build), plain CSS and MDX. The design brief and mockups live in [`docs/redesign/`](docs/redesign/REDESIGN-BRIEF.md).

## Running it

```bash
npm install
npm run dev       # http://localhost:4321, drafts included
npm run build     # type-check, then build the static site into dist/
npm run preview   # serve dist/
```

## Deploying (Cloudflare Pages)

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | from `.node-version` |

Caching and security headers are in `public/_headers`.

## Writing a story

Each story is a folder: `src/content/posts/{year}/{slug}/index.mdx`. The folder path is the URL (`/{year}/{slug}/`), so keep it once published. Images and cartoons sit next to the post.

```yaml
---
title: The headline                 # required
date: '2026-11-02'                  # required
draft: true                         # hidden in production, still counts for issue numbers
deck: Bold Subheadline, Headline Case, ≤ 60 Chars
subdeck: A longer italic line for the article page and front-page lead
section: technology                 # technology | sport | life
cartoon:
  image: ./cartoon.svg              # wide version (front page, article)
  imageNarrow: ./cartoon-narrow.svg # optional, used in the archive
  caption: “A caption, with `code` set upright.”
  alt: What the cartoon shows, for screen readers
---
```

Everything except `title` and `date` is optional; pages skip whatever is missing. Never delete a published post: set `draft: true` so the issue numbers (Vol. — No.) of later posts stay put.

**Cartoons** are SVG files drawn with `currentColor` for ink and `class="pp"` (or `fill: var(--paper)`) for paper. They are inlined, so they follow the reader's edition. Give IDs a unique suffix per file. `cartoon.svg` in any 2019 post is a working example.

**In the body**, plain Markdown works: `##` becomes a centred subhead, `---` a star ornament, `> quote` a ruled blockquote. For newspaper furniture, import the components in `src/components/post/`:

```mdx
import Figure from '../../../../components/post/Figure.astro';
import photo from './photo.png';

<Figure src={photo} alt="…" label="Bewilderment." caption="…" />
```

- `Figure`: one photograph with caption (`wide` to span the columns)
- `Exhibits` + `Exhibit`: a row of labelled screenshots
- `Proverb`: a centred saying with an optional gloss (`lang="fr"` for French)
- `Map`: an inline SVG drawing, full width, with a caption

**Code** fences get the "wire copy" frame. Add a filename and caption in the fence:

````md
```css title="styles.css" caption="The one line that ended a decade of jokes."
.front-page { display: grid; place-items: center; }
```
````
