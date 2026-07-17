# LiteTech Challenge — Frontend

Take-home interview project: a tech blog frontend, evaluated primarily on
**visual/pixel-perfect fidelity to Figma**, not on minimal code. Where default
engineering instincts (YAGNI, avoid extra deps) would conflict with looking
polished or "complete" to a reviewer, favor the more thorough/textbook choice.

## The brief

- Homepage lists 9 article cards from the API.
- Clicking a card opens its detail page.
- Detail page renders the full article and, at the bottom, shows 3 "related"
  posts — the ones created via the "New post" modal.
- "New post" modal creates a post with an image + title, persisted to our own
  API (not the upstream lite-tech-api).
- The article body on the detail page is **static**, built from a fixed
  markdown source (see `ARTICLE_MARKDOWN` in `app/post/[id]/page.tsx`) — the
  upstream API has no rich-text field yet.
- Design reference (desktop + mobile) lives in Figma; assets are downloadable
  from there. Every element in the design — including hover/interactive states
  — must be implemented, not just the static layout.
- Animations/transitions are optional but explicitly called out as a bonus.

## Evaluation criteria (in the client's own words)

- On-time delivery.
- App works correctly, with no errors.
- **Pixel-perfect** design fidelity — 100% match to the Figma reference.
- Overall visual quality and attention to detail.
- Clean, organized, readable code.
- Responsive across resolutions/devices.
- High performance / fast response times.
- Visual polish is explicitly called out as the central, protagonist criterion
  — functionality alone is not enough. Typography, spacing, color, and
  visual hierarchy all count.
- Use of AI tooling is explicitly permitted and expected; judged on the
  result, not the process.

**Practical implication:** when a pixel-matching task is ambiguous or a fix
doesn't visibly match the reference, don't guess — verify with a screenshot
and pixel/DOM measurement before claiming it's fixed.

## APIs

Two separate APIs are involved:

- **lite-tech-api** (upstream, read-only, third-party):
  - `GET /api/posts` — homepage post list
  - `GET /api/post/{id}` — single post detail
- **Our own backend** (`../backend`, NestJS + Prisma), which this frontend
  also owns responsibility for:
  - `GET /api/posts/related` — posts loaded via the "New post" modal
  - `POST /api/post/related` — create a post (image + title)

`lib/api.ts` wraps both under one `API_URL` (`NEXT_PUBLIC_API_URL`, defaults
to `http://localhost:4000/api`) and tags results with `source: "lite-tech" |
"related"`.

## Stack & conventions

- Next.js 16 (App Router, Turbopack), React 19, TypeScript.
- Tailwind CSS v4, CSS-first config (`@theme` in `app/globals.css`) — semantic
  design tokens (`text-icons-*`, `background-*`, `border-*`) map to raw
  Figma-derived palette values. Prefer existing tokens over new raw colors.
- `react-hook-form` + `zod` (`@hookform/resolvers`) for the upload form.
- `markdown-it` for rendering the static article markdown
  (`lib/parse-article.ts`).
- Components use `const X = () => {}` arrow-function style, declared then
  exported via `export { X }` at the bottom of the file (see
  `components/header-placeholder.tsx` as the reference pattern) — not
  `function X() {}` declarations, not inline `export const`.
- `sharp`-generated `blurDataUrl` values come from the backend and are wired
  into `next/image`'s `placeholder="blur"` — no custom fade/blur component;
  a prior custom two-layer fade component was tried and explicitly reverted
  in favor of plain `next/image` behavior.
- Custom entrance animations (`animate-fade-from-bottom/top/left/right`,
  `animate-fade-in`) are plain unlayered CSS classes in `globals.css`, not
  Tailwind `@theme --animate-*` utilities — `tw-animate-css` registers a
  wildcard `animate-*` utility that silently overrides theme-based animation
  utilities of the same prefix; unlayered CSS wins the cascade regardless of
  source order, so that's the working pattern here.

## Verifying visual work

No visual/CSS fix should be reported as done without checking it:
- Run the dev server, take a Playwright screenshot, and compare against the
  Figma reference or provided screenshot.
- For layout/spacing questions, prefer exact measurement (DOM
  `getBoundingClientRect()` via Playwright, or pixel analysis with PIL/numpy)
  over eyeballing a screenshot crop.
- Be conservative with structural changes to `components/ui/card.tsx` based
  on screenshot analysis alone — propose the change and confirm before
  applying it.
