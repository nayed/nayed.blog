# nayed.blog — 1920s Broadsheet Redesign: Build Brief

This is the complete brief for rebuilding **nayed.blog** (currently Gatsby, repo `nayed/nayed.blog`) in **Astro**, with a new 1920s-newspaper design. Every decision below has been made. Where something is still open, it is listed under *Open questions*. Ask before deciding those.

The visual reference is in `design-reference/`. Each file is a mockup page (front page, article page, archive) written in a canvas-tool format: plain HTML with inline styles, plus `{{placeholders}}` filled in by the small script at the bottom of each file. Treat them as **visual and structural reference, not code to copy**. Rebuild them as clean Astro components and CSS.

Image links in the reference files look like `/_blob/…` and won't load locally:
- `/_blob/a7960a…` is the avatar: use `assets/avatar-1920s-transparent.svg`.
- The other `/_blob/…` images are the screenshots already in the repo next to the "Should developers design" post: `nayed.io.png`, `nayed.blog.png`, `pokedex.png`, `quizz-sida.png`, `espacedesign.png`.

---

## 1. Stack

- **Astro** (latest stable), **TypeScript**, Astro **content collections** for posts.
- Plain CSS: global stylesheet plus component-scoped styles. No Tailwind, no CSS-in-JS.
- **Shiki** for code highlighting, with a custom theme (see §7).
- Interactive bits (edition switcher, copy-code button) as small vanilla-JS scripts. No framework runtime unless a later feature needs it (React islands are allowed later).
- Fully static output.

## 2. Content migration

- Migrate the 3 existing posts from `src/pages/2019/*/index.md` (Gatsby) into the Astro content collection, with their images.
- **Keep the post text exactly as written**, typos included. It's the author's voice. Strikethroughs (`~~software~~`) stay.
- **Keep existing URLs**: `/2019/should-developers-design/`, `/2019/my-first-meetup/`, `/2019/origin-story/`. Same pattern for future posts: `/{year}/{slug}/`.
- The Origin Story post has two Google Maps `<iframe>` embeds with an API key in the source. Flag this to the author before migrating; don't silently keep or drop them.
- Keep the RSS feed, at the same path as the current one if possible (check the Gatsby config).

## 3. Frontmatter schema

```ts
// src/content.config.ts (shape — adapt to the current Astro API)
{
  title: string,                      // the headline
  date: Date,
  draft?: boolean,                    // hidden but keeps its place in the issue numbering
  deck?: string,                      // bold subheadline under the headline, ≤ ~60 chars, Headline Case
  subdeck?: string,                   // longer italic line, article page + front-page lead only
  section?: 'technology' | 'sport' | 'life',   // see §8
  cartoon?: {
    image: image(),                   // wide version (front page, article footer)
    imageNarrow?: image(),            // optional narrow version (archive thumbnails, small spots)
    caption: string,
    alt: string,
  },
  corrections?: { date: Date, note: string }[], // later feature, schema now
}
```

All of `deck`, `subdeck`, `section`, `cartoon` are **optional**. Templates skip whatever is missing.

Decks written during design (use them in the migrated posts):

| Post | deck | subdeck |
|---|---|---|
| Should (web) developers design? | Young Programmer Hears "I Hate CSS" Once Too Often | Recalls Boyhood Awe at Websites "So Awesome" He Knew His Calling; Asks Why Craft and Code Must Part Ways |
| My first (React) meetup | Correspondent, Removed From Lyon to Paris, Reports on the Tech Scene | — |
| Origin story | Fourth Blog in Six Years Declared, at Last, the Serious One | — |

Cartoon captions (the cartoons themselves are inline SVG in the reference files; extract each drawing into its own `.svg` file. Each one is the avatar image plus a drawn scene):

- Should developers design: *"My good man, I count forty-seven !important declarations. This is no stylesheet. It is a confession."*
- My first meetup: *Our correspondent arrives at his first meetup, fully braced for the Council of Grey Beards.*
- Origin story: *"This one," declared Mr. Saïd Ali, "is the serious one."*

## 4. Design tokens

### Editions (colour themes)
Three editions. The reader cycles through them with a button. **No green "Sporting Final"** (dropped).

| Edition | paper | ink | extra |
|---|---|---|---|
| Morning (default light) | `#F1EADB` | `#1C1A17` | — |
| Evening (dark) | `#1A1815` | `#E9E1CF` | — |
| Late Final | `#EBC4AC` | `#2A1610` | red stamp `#A3121A` "LATE FINAL", rotated −9°, `4px double` border, over the masthead |

Derived: rules/column rules = ink at 35% alpha; halftone dots = ink at ~42% alpha.

Behaviour:
- Default edition: Morning, or Evening when `prefers-color-scheme: dark`.
- The reader's choice is saved in `localStorage` and applied by an **inline script in `<head>`** before first paint, so the wrong colours never flash.
- Button label: "Next: the {Edition name}". The masthead box shows the current edition name.

### Typography
| Role | Font (Google Fonts, self-host if convenient) |
|---|---|
| Masthead "The Nayed Blog" | **Abril Fatface** (all pages) |
| Headlines, labels, small caps, datelines | **Old Standard TT** 400/700/italic |
| Body text | **Libre Caslon Text** 400/700/italic |
| Code | **Courier Prime** 400/700/italic |

- Headlines: uppercase, tight leading (~0.95), slight negative tracking.
- Labels and datelines: uppercase, 11–13px, letter-spacing 0.14–0.22em.
- Body: justified, `hyphens: auto`, ~16.5–17px, line-height ~1.55–1.6, drop cap on the first paragraph of an article.

### Ornaments and rules
- Section dividers: `4px double` (major) and `1px solid` (minor) rules in ink.
- Boxes: `1px solid` border plus `outline: 1px solid; outline-offset: 3–5px` (double-frame look). No rounded corners, no shadows.
- Small four-pointed star ornament (SVG) for dividers and the end-of-article dinkus, followed by "— 30 —".
- Halftone background for empty image frames: `radial-gradient(dot 0.9px, transparent 1.1px)` at `4px 4px`.
- Photos and screenshots: `filter: grayscale(1) contrast(1.08) sepia(0.15)` with a 1px ink border.
- Theme the browser's own UI too: `::selection` in ink/paper, `:focus-visible` outline (`#8A1C1C`), link underline offset.

## 5. Pages

### Front page (`/`), see `design-reference/front-page.html`
- **Masthead row:** "Our Motto" box (left, *"20-something developer ranting about stuff he doesn't grasp."*), masthead centred with "PERSONAL BLOG OF NAYED SAÏD ALI" beneath, edition box (right).
  - Under 720px: the boxes stack and centre; the subtitle drops to 12px with 0.12em tracking and no wrapping.
- **Dateline strip** between a double rule and a single rule: `Vol. {roman} — No. {n}` · `Paris, {weekday}, {date}` · `{count} Stories · Price: Free`. Values come from the **latest** post (§6).
- **Lead story** (latest post): headline, deck, subdeck, byline strip, opening paragraphs in columns, "Continued on Page 2 →" link to the post.
- **Filler under the lead:** the lead post's **cartoon** (heading "Our Cartoonist Considers the Question", framed panel, caption). The pull-quote version in the reference was the alternative; the cartoon won.
- **Right column:** author portrait (`assets/avatar-1920s-transparent.svg`, grayscale-sepia, on halftone, caption "THE AUTHOR. Mr. Saïd Ali, lately of Lyon, now of Paris, photographed in his Sunday best.") then the next stories as teasers (headline, deck, date, reading time, excerpt).
- **Bottom row:** "Index to This Issue": the latest **5** posts with dotted leaders and page numbers (lead = "1–2", then 3, 4, …), and **The Archive** box ("The complete index of this paper: every story ever printed, newest first, each with the cartoon that ran beside it." + "Browse the Archive →").

### Article page (`/{year}/{slug}/`), see `design-reference/article-page.html`
- Slim header: masthead (Abril, ~2rem) linking home, "← Front Page", edition button.
- Headline, deck, subdeck, byline strip ("By Nayed Saïd Ali, Staff Correspondent" · "Paris, {date}" · reading time "Two Minutes' Reading, or So").
- Body in CSS columns (`column-width: 18rem`) with column rules.
  - Images, image groups and **code blocks** use `column-span: all` (full width), with a caption below.
  - `##` headings become centred small-caps subheads.
  - Blockquotes: centred, between rules.
- End: star dinkus, "— 30 —", then **This Story's Cartoon** (full width, caption).
- Right sidebar (~280px basis): "The Latest Stories" (latest **5**, excluding the current post: date, headline, deck) and The Archive box.
- Mobile: one column; the sidebar goes below the article.

### Archive (`/archive/`), see `design-reference/archive-page.html`
- Big "THE ARCHIVE" title, intro line, strip: "Volume I · {n} Stories · {n} Cartoons · Newest First" (the volume shown is the current one).
- Grouped by year, newest first. Year heading: "MMXIX — The Year 2019" between double rules.
- One entry per post: framed cartoon on the left (narrow version if present; the whole frame links to the post) with its caption; on the right the full weekday date, reading time, headline, deck, opening lines, "Read the Story →". Posts without a cartoon get a halftone frame or no frame (your call, keep it consistent).

### Footer (all pages)
`PRINTED & PUBLISHED BY NAYED SAÏD ALI · GITHUB · RSS · COPYRIGHT MMXIX – {current year in roman}`, e.g. `MMXXVI`, computed at build time.

## 6. Volume and issue numbers (decided)
- **Volume** = years since the 2019 founding + 1, in Roman numerals (2019 = I, 2026 = VIII).
- **No.** = the post's position among all published posts, oldest first, **never resetting**.
- So the next post, in 2026, will be **Vol. VIII — No. 4**.
- Unpublishing = `draft: true`, never deletion, so numbers stay stable.

```ts
const FOUNDED = 2019;
function toRoman(n: number): string {
  const map: [number, string][] = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
  let out = ""; for (const [v, r] of map) { while (n >= v) { out += r; n -= v; } } return out;
}
export const issueLabel = (posts: { date: Date }[], i: number) =>
  `Vol. ${toRoman(posts[i].date.getFullYear() - FOUNDED + 1)} — No. ${i + 1}`;
```

## 7. Code blocks (decided)
- Full width (`column-span: all`), double-frame box like other boxes.
- Header strip: `WIRE COPY · {filename or language}` (small caps) plus a **COPY** button on the right (real `<button>`, ≥44px tall).
- Body: Courier Prime 17px, line-height 1.65, padding ~22px 24px, faint tint (`ink` at 5% alpha), horizontal scroll for long lines.
- **Custom Shiki theme, ink only:** keywords and selectors **bold**, strings and values *italic*, comments and punctuation in faded ink (`#5E574C` light / `#A99F8C` dark), numbers and units in red (`#8A1C1C` light / `#E58A7C` dark). No other colours. The theme must follow the active edition (use Shiki's CSS-variables or dual-theme output).
- Optional caption below, centred italic.
- Inline `code`: Courier Prime 0.95em, faint tint, thin bottom rule, no rounded corners.
- Support a filename in the Markdown fence (e.g. ```` ```css title="styles.css" ````) for the header strip.

## 8. Sections (decided)
- `section` frontmatter: `technology`, `sport` (Olympique Lyonnais and so on), `life`.
- Used for the heading a story runs under, and later section pages (`/section/{name}/`). Sections do **not** change paper colour.
- Existing posts: should-developers-design → technology, my-first-meetup → technology, origin-story → life.

## 9. Accessibility and quality
- Real `<button>` / `<a href>` everywhere, touch targets ≥ 44px, visible focus.
- Text contrast ≥ 4.5:1 in all three editions (check the Late Final pink especially).
- Decorative SVG `aria-hidden`; cartoons get `alt` from frontmatter.
- Works at 360px width with no horizontal scroll.
- `lang="en"`; French proverbs in posts get `lang="fr"`.

## 10. Later (not in v1, keep the structure ready)
- Share images per post designed like a newspaper clipping (headline, deck, cartoon on newsprint).
- Print stylesheet ("print this edition").
- 404 page: "STOP THE PRESSES: this story was spiked by the editor."
- Letters to the Editor (email link or GitHub Discussions).
- Corrections box rendered from `corrections`.
- Possible French edition (`/fr/...`).
- "Tech Weather Report" box on the front page.

## Answered questions (2026-11-02)
1. **Hosting:** Cloudflare Pages (moving from Netlify). Static build, `npm run build`, output `dist/`.
2. **Repo:** Astro replaces Gatsby in this repo, developed on the `astro` branch.
3. **Google Maps iframes (Origin Story):** replaced by drawn 1920s-style SVG maps with captions. The old API key is public in git history and should be restricted or rotated in Google Cloud.
4. **Fonts:** self-hosted via `@fontsource` packages.

Further decisions taken with the author:
5. **Editorial dressing:** image captions and "Exhibit" labels, subheads in place of the `-` separators in "Should developers design", and the French proverb as a centred blockquote are all in. The demo code block from the mockup is not (it isn't the author's text).
6. **Analytics:** dropped (the Universal Analytics property is dead). No tracking scripts.
7. **Separators:** remaining `---` rules in posts render as the star ornament.
