# Set Consent Mode before the GTM container, outside React

GTM only recognises a consent command when the pushed value is the `arguments` object of a `gtag()`
call. Pushing an array of the same shape is accepted by `dataLayer` and silently ignored, which is
how the banner ran without controlling the container from the first commit of `gtm-script.tsx`
(issue #38). Every consent command therefore goes through a `gtag()` helper that pushes `arguments`;
custom events such as `consent_initialized` and `consent_updated` stay plain object pushes.

The `consent default` state is set by an inline `beforeInteractive` script in the root layout
(`consent-default-script.tsx`), not by a React effect. An effect runs after hydration and therefore
after `gtm.js`, which leaves `wait_for_update` nothing to wait for. That script reads the stored
consent straight from `localStorage`: routing it through the provider would arrive after hydration
as well and would hold tags at `denied` for 500 ms although consent was already given. Reading the
value twice - once as a string of JavaScript, once in the provider - is the accepted cost; only the
provider copy is typechecked.

Alternatives rejected:

- **Keep the default in a React effect and only fix the push format.** Fixes the format but not the
  order: the container still loads before the first consent signal.
- **Gate the container on the provider so the default is guaranteed to come first.** Ties tag loading
  to hydration and keeps the 500 ms window even for visitors who already consented.
- **Read the consent cookie in the early script as a fallback to `localStorage`.** The provider reads
  `localStorage` only, so a cookie-only fallback would set a granted default while the banner asks
  again. Both sides stay on the same source instead.

Consent updates are pushed from `pushConsentToDataLayer` in `provider.tsx`, in the same synchronous
call that persists the choice and immediately before the `consent_updated` event. A React effect
would land after that event, so tags triggered on it would still see the old state.
