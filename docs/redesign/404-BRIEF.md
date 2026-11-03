# nayed.blog: 404 Page Brief ("Stop the Presses!")

A self-contained task for the **existing** Astro codebase on `main`. Reuse what's there (`BaseLayout`, `SlimHeader`, `Footer`, `Cartoon`, the global classes in `src/styles/global.css`) and **don't restyle anything outside this page**.

Visual reference: `docs/redesign/design-reference/404-page.html` (same canvas format as the other mockups: inline styles plus `{{placeholders}}`; rebuild with the project's components and classes, don't copy).

---

## 1. File and plumbing
- Create `src/pages/404.astro`. Astro builds it to `dist/404.html`, which **Cloudflare Pages** serves automatically, with a real 404 status, for any unmatched route.
  - Check that `trailingSlash: 'always'` doesn't change the output name; it must stay `404.html` at the root of `dist/`.
- Wrap the page in `BaseLayout`:
  - `title="Stop the Presses! Page Not Found"`;
  - add `<meta slot="head" name="robots" content="noindex" />`.
  - `BaseLayout` builds a canonical URL from `Astro.url.pathname`. For this page that's harmless (it's noindex), but if it's easy, skip the canonical for the 404 with an optional prop; don't break other pages.
- **The site uses `ClientRouter`.** Any script on this page must run on `document.addEventListener('astro:page-load', …)`, not just once at load, or it won't run when the reader gets here through an internal link.

## 2. Layout, top to bottom

1. **`<SlimHeader page="Special Edition" />`**, used as is. (The mockup had an extra "The Archive" link in the nav. Skip it; the Archive is linked in the body.)
2. **Dateline**, a `.strip.label` (style it like the front-page dateline, single rule below):
   `Special Edition — No. 404` · `Paris, {today}` · `One Story · Price: Free`
   - **Today**: render `fullDate(new Date())` (from `src/lib/words.ts`) at build time inside `<time data-today>`, then replace it client-side on `astro:page-load` with `new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })`, local time.
3. **Headline block**, centred, wrapped in `position: relative`:
   - `<h1 class="headline">Stop the Presses!</h1>`, larger than an article headline: `font-size: clamp(3rem, 10vw, 7.5rem); line-height: 0.9; letter-spacing: -0.03em`.
   - **SPIKED stamp**, `aria-hidden="true"`, absolutely positioned over the right part of the headline: `rotate(-11deg)`, `5px double` border, Old Standard 700 uppercase, `letter-spacing: 0.2em`, `font-size: clamp(18px, 2.6vw, 30px)`, `opacity: 0.88`.
     - **Colour: don't use `--stamp`.** It's `transparent` outside the Late Final edition. Use `var(--code-accent)` (red in Morning and Late, lighter red in Evening), or add a page-local `--spike` token.
     - On narrow screens keep it inside the viewport (`right: 0`) and let it shrink.
   - `<hr class="short-rule" style="--w: 160px; margin: 20px auto" />`
   - `<p class="deck">Page Not Found; Editor Spikes Story Before It Reaches Print</p>` (`max-width: 40ch`)
   - `<hr class="short-rule" style="--w: 60px" />`
   - `<p class="subdeck">Staff Search Composing Room, Archive and Waste-Paper Basket to No Avail; Reader Advised to Check His Spelling</p>` (`max-width: 52ch`, ~18px)
4. **Body**: a flex-wrap row (cartoon `flex: 1 1 340px; max-width: 440px`, story `flex: 999 1 420px; min-width: 0`). It stacks under about 760px, cartoon first.
   - **Left, the cartoon**: see §4. Caption: *"Not fit to print," declared the editor, and reached for the spike.*
   - **Right, the story**:
     - `<p class="strip label">By the Night Editor</p>`
     - Body text in columns, matching the article prose (`column-width: 17rem`, column rule `var(--rule)`, justified, 17px / 1.6):
       1. **PARIS —** The page you asked for, filed under `<code data-missing-path>this address</code>`, could not be found anywhere in these offices.
       2. Staff searched the composing room, the archive and the editor's waste-paper basket. The story may have been moved, renamed, or simply never printed at all.
       3. The editor, reached for comment, adjusted his monocle and said only: "Check the spelling, then try the front page."
       - (Use the typographic quotes and dashes, as everywhere else.)
     - **"Where to Go From Here"** box: a `.frame` with `<h2>` styled like the ArchiveBox title (~18px). Each row is a full-width link with a dotted leader (the same pattern as the front page's "Index to This Issue"; **reuse its markup/CSS if it's a component, otherwise mirror it**):
       - Today's Front Page → `/`
       - The Archive, Every Story Ever Printed → `/archive/`
       - small-caps divider line (`.label`, centred, hairline above): "Or One of the Latest Stories"
       - `(await getIssues()).slice(0, 5)`: `post.data.title` … `shortDate(post.data.date)`, linking to `postUrl(post)`.
5. **`<Footer />`**, as is.

## 3. The requested path
- Fill `[data-missing-path]` on `astro:page-load` with `location.pathname`, via **`textContent` only, never `innerHTML`**. It's reader-controlled input.
- If it's very long (> ~80 chars), truncate the middle with an ellipsis so it can't blow up the column. Also allow `overflow-wrap: anywhere` on that `<code>`.
- Inline-code style: whatever `prose.css` already uses for inline `code`. Apply the same class or styles, don't invent new ones.
- Without JavaScript it reads "filed under this address", which is still a correct sentence.

## 4. The spike cartoon
- New file `src/assets/cartoons/404-spike.svg`, following the **existing cartoon conventions** (see any `src/content/posts/2019/*/cartoon.svg`):
  - ink = `currentColor`, paper = `class="pp"` with the `<style>.pp{fill:var(--paper,#F1EADB)}</style>` block;
  - the avatar placed with `<image href="/images/avatar-1920s.svg" …>` through the same newsprint `<filter>`, **renamed with a unique suffix** (e.g. `press-404`);
  - the spike drawing nested as an inner `<svg>` to the right of the avatar, exactly like the stack in `should-developers-design/cartoon.svg`.
  - Take the spike's paths from `404-page.html` (the `<svg role="img" aria-label="A newsroom spike…">` block). Map `{{ink}}` → `currentColor` and `{{paper}}` → `class="pp"`.
  - Drawing: a tall nail on a black base, three blank pages impaled at angles (9°, −13°, 16°) with two hairlines each, and on top a page tilted −6° reading **404** (Old Standard 700, large) and **PAGE NOT FOUND** (small, letter-spaced). The nail's tip shows above the top page.
- Render it with the existing **`Cartoon`** component if it accepts a directly imported SVG:
  `import spike from '../assets/cartoons/404-spike.svg'` → `<Cartoon cartoon={{ image: spike, caption: '…', alt: 'A newsroom spike, its tall nail stacked with impaled pages, the top one stamped 404' }} />`.
  If the types don't line up (`Cartoon` expects the collection's cartoon data), add the smallest possible change, e.g. widen its `Props` type to accept `{ image, caption, alt }`. Don't fork the component.
- Use `--drawing-max` / `--caption-size` on the wrapper to fit the column, as elsewhere (caption ~15px).

## 5. Done when
- [ ] `npm run build` passes, including `astro check`.
- [ ] `npm run preview` shows the page at an unknown URL. On the deployed Cloudflare Pages site, `/this-does-not-exist/` returns **HTTP 404** with this page.
- [ ] The requested path appears in the first paragraph, HTML-escaped, including after navigating there through an internal link (ClientRouter).
- [ ] All three editions look right. The SPIKED stamp is visible in **every** edition (not only Late Final), and the spike drawing follows ink and paper.
- [ ] At 360px wide: no horizontal scroll, stamp fully visible, cartoon above the story.
- [ ] Latest-stories rows come from `getIssues()` (max 5, drafts excluded in production) and link to the right URLs.
- [ ] Text contrast ≥ 4.5:1 in all editions, links and the edition button ≥ 44px tall, and the page has exactly one `<h1>`.
