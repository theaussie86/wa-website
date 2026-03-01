# GDPR Cookie Consent Solution Design

**Date:** 2026-03-01
**Status:** Approved
**Approach:** Custom-built solution (no external dependencies)

## Requirements

- GDPR compliant cookie consent banner
- Support for GA4 + Google Tag Manager
- Three consent categories: Essential, Analytics, Marketing
- German language only
- GTM Consent Mode v2 integration
- Re-access via footer link

## Architecture

### Components

1. **CookieConsentProvider** (`src/app/_components/cookie-consent/provider.tsx`)
   - React context managing consent state
   - Handles localStorage + cookie persistence
   - Provides `useConsent` hook

2. **CookieConsentBanner** (`src/app/_components/cookie-consent/banner.tsx`)
   - UI component with compact and expanded views
   - Three buttons: Accept All, Reject (Essential only), Customize
   - Toggle switches for Analytics and Marketing categories

3. **GTMScript** (`src/app/_components/cookie-consent/gtm-script.tsx`)
   - Injects GTM with Consent Mode v2 defaults
   - Listens to consent changes and updates gtag

4. **CookieSettingsButton** (for footer)
   - Opens consent modal from footer link

### Data Flow

```
Page Load → Check localStorage → No consent? → Show Banner
                                  ↓
                            Has consent → Initialize GTM with stored preferences
                                  ↓
User action → Store in localStorage + cookie → Push to dataLayer → GTM updates
```

### Consent Categories

| Category | Cookie Types | GTM Consent Signals |
|----------|--------------|---------------------|
| Essential | Session, theme, consent choice | N/A (always allowed) |
| Analytics | GA4, session recording | `analytics_storage` |
| Marketing | Ads, retargeting, conversions | `ad_storage`, `ad_user_data`, `ad_personalization` |

## UI Design

### Compact Banner (Initial)
- Fixed to bottom of viewport
- Brief text explaining cookie usage
- Link to Datenschutz page
- Three buttons: "Alle akzeptieren", "Nur Essenzielle", "Anpassen"

### Expanded View (Modal)
- Overlay modal with toggles per category
- Essential always on (disabled toggle)
- Analytics and Marketing toggleable
- Buttons: "Auswahl speichern", "Alle akzeptieren"

### Styling
- Follows existing Tailwind design system
- Primary button: blue (#003970)
- Dark mode support
- Accessible (keyboard navigation, ARIA labels)

## GTM Consent Mode v2

### Default State (before consent)
```javascript
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied'
});
```

### After Consent Update
```javascript
gtag('consent', 'update', {
  'analytics_storage': consent.analytics ? 'granted' : 'denied',
  'ad_storage': consent.marketing ? 'granted' : 'denied',
  'ad_user_data': consent.marketing ? 'granted' : 'denied',
  'ad_personalization': consent.marketing ? 'granted' : 'denied'
});
```

### DataLayer Events
- `consent_initialized` - On page load with current state
- `consent_updated` - When user changes preferences

## Storage

- **localStorage key:** `wa_cookie_consent`
- **Cookie name:** `wa_cookie_consent`
- **Cookie expiry:** 365 days
- **Format:** JSON `{ essential: true, analytics: boolean, marketing: boolean, timestamp: number }`

## Files to Create/Modify

### New Files
- `src/app/_components/cookie-consent/provider.tsx`
- `src/app/_components/cookie-consent/banner.tsx`
- `src/app/_components/cookie-consent/gtm-script.tsx`
- `src/app/_components/cookie-consent/types.ts`
- `src/app/_components/cookie-consent/index.ts`

### Modified Files
- `src/app/layout.tsx` - Add CookieConsentProvider and GTMScript
- `src/app/_components/footer.tsx` - Add "Cookie-Einstellungen" link

## Verification

1. Banner appears on first visit
2. "Alle akzeptieren" stores full consent, hides banner
3. "Nur Essenzielle" stores essential-only, hides banner
4. "Anpassen" shows toggles, saves correctly
5. Consent persists across page loads
6. Footer link reopens settings modal
7. GTM dataLayer receives correct consent events
8. Dark mode styling works correctly
