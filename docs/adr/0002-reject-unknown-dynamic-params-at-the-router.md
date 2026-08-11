# Reject unknown dynamic params at the router, not with notFound() in the page body

Routes whose parameter list is complete at build time set `export const dynamicParams = false`
next to their `generateStaticParams` (`src/app/blog/[slug]`,
`src/app/second-brain-anleitung/guide/[chapter]`). Unknown parameters are then rejected by the
router and answered from `src/app/not-found.tsx`, rendered inside the root layout. The reason is a
rendering detail that is easy to mistake for a status-code bug: when `notFound()` is thrown from a
page body, Next renders the not-found boundary into its internal error document
(`<html id="__next_error__">`), which bypasses the root layout. The response carries HTTP 404 and
`<meta name="robots" content="noindex">`, but the server-rendered `<body>` holds 38 characters -
the page only appears after hydration, and never without JavaScript.

Issue #28 reported HTTP 200 for missing blog slugs. That symptom had a different cause and was
already gone: `CookieConsentProvider` returned `null` until a `useEffect` had run, so on the server
it discarded the whole page tree including the page that calls `notFound()`. Nothing threw
server-side, the response was 200, and the 404 happened in the browser. Commit 0dca7fb (issue #34)
fixed that. `src/proxy.ts` was never involved - its matcher only covers
`/second-brain-anleitung/guide/:path*`.

Rewriting missing slugs in `src/proxy.ts`, which the Next documentation suggests for exactly this
case, was rejected: it would need the post list inside the proxy and turn `_posts/` into a second
source of truth, and it buys nothing here because that directory ships inside the image - a new
article means a new build either way, which is also what makes `dynamicParams = false` safe.
`experimental.globalNotFound` was rejected because it bypasses the root layout by design, so fonts,
global styles, header and footer would have to be duplicated in that file, and it only covers
unmatched URLs, not `notFound()`.

`npm run check:404` guards both failure modes - a 200 on a dead URL and a 404 with an empty body -
and runs in CI against the built application.
