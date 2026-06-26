# Conversion Model

## Primary Macro Conversion

The primary macro conversion is a successful Telegram inquiry.

The macro conversion event is:

```text
generate_lead
```

`generate_lead` must be emitted only after the server successfully delivers the inquiry to Telegram and the app receives a confirmed success response from `POST /api/telegram`.

A submit button click is not the macro conversion. A form submit attempt is not the macro conversion. Validation failures, rate limiting, missing configuration, Telegram HTTP errors, timeouts, and unknown server errors must not emit `generate_lead`.

When Google Analytics 4 is integrated later, only `generate_lead` should be marked as the primary key event for this funnel.

## Micro Conversions

Micro conversions describe meaningful user progress before the business conversion:

- `page_view`: user views a localized page.
- `hero_cta_click`: user clicks the main hero CTA.
- `spread_started`: user starts the tarot spread interaction.
- `spread_card_selected`: user selects a card in the spread.
- `spread_completed`: user completes the full spread.
- `lead_form_start`: user starts interacting with the lead form.
- `lead_submit_attempt`: user attempts to submit the lead form.
- `lead_submit_error`: the lead submission fails.

Micro conversions can be used for funnel analysis, UX diagnostics, and design iteration. They should not be marked as the primary business conversion.

## Funnel

| Step | Event | Meaning | Key event later? |
| --- | --- | --- | --- |
| 1 | `page_view` | A localized page is viewed. | No |
| 2 | `hero_cta_click` | The main hero CTA is clicked. | No |
| 3 | `spread_started` | The spread interaction begins. | No |
| 4 | `spread_card_selected` | A card is selected in the spread. | No |
| 5 | `spread_completed` | The full spread is completed. | No |
| 6 | `lead_form_start` | The visitor starts interacting with the lead form. | No |
| 7 | `lead_submit_attempt` | The visitor attempts to submit the lead form. | No |
| 8 | `lead_submit_error` | Submission fails due to validation, rate limiting, configuration, Telegram, timeout, or unknown server error. | No |
| 9 | `generate_lead` | Telegram delivery succeeds and the app receives success confirmation. | Yes |

The current UI draws the spread with one button. Until the UI supports explicit card-by-card selection, `spread_card_selected` is part of the stable event contract but should not be wired as a user-selection event.

## Event Parameters

Only privacy-safe parameters are allowed:

| Parameter | Type | Usage |
| --- | --- | --- |
| `locale` | string | Current locale, for example `en`, `uk`, or `ru`. |
| `page_path` | string | Path only, for example `/en`; do not include query strings with personal data. |
| `cta_location` | string | CTA placement, for example `hero`. |
| `spread_cards_count` | number | Number of cards in the completed spread. |
| `form_id` | string | Stable form identifier, for example `lead-form`. |
| `lead_channel` | string | Lead delivery channel, currently `telegram`. |
| `telegram_delivery_status` | string | Coarse status, `success` or `failed`. |
| `error_type` | string | Coarse error category. |
| `deployment_env` | string | Deployment environment when safely available. |

Allowed `error_type` values for the current lead flow:

- `validation`
- `rate_limited`
- `missing_configuration`
- `telegram_http_error`
- `network_or_timeout`
- `unknown_server_error`

## Privacy Rules

Do not send personal data to analytics.

Never send:

- Names.
- Phone numbers.
- Telegram usernames.
- Message text.
- Email addresses.
- Bot tokens.
- Chat IDs.
- IP addresses.
- Raw form content.
- Turnstile tokens.
- User-agent strings when they can identify a person.

Analytics events must remain coarse and behavioral. Telegram lead content belongs only in the Telegram delivery path and must not be copied into analytics, logs, or monitoring breadcrumbs.

## Implementation Contract

`src/lib/analytics.ts` owns the central event name map and the `trackEvent` helper. The helper is currently provider-neutral and safe: it does not load scripts and does not send network requests.

Current no-op tracking calls are wired for:

- `page_view`
- `hero_cta_click`
- `spread_started`
- `spread_completed`
- `lead_form_start`
- `lead_submit_attempt`
- `lead_submit_error`
- `generate_lead`

`spread_card_selected` is intentionally not wired yet because the current interface does not expose explicit user card selection.

Provider selection, consent handling, GA4/GTM setup, and key-event marking belong to the later observability task.

## Design Inputs Before Staging QA

Approved brand spelling:

```text
Tarot Warrior Path
```

Production domain:

```text
tarotwarriorpath.com
```

Primary CTA role: move visitors from the hero section into the tarot spread interaction. It is a micro-conversion (`hero_cta_click`), not the final conversion.

Localized SEO text status: current localized titles, descriptions, and metadata live in `src/data/locales/*.json`; final sales copy still needs business approval before staging QA.

OG image status: `public/og.svg` is the current shared placeholder production input. A final approved social image should keep a 1200 by 630 aspect ratio.

Image dimensions and aspect ratios:

- Open Graph image: 1200 by 630, 1.91:1.
- Card artwork: keep a consistent vertical card ratio across localized media.
- Hero and decorative images: preserve enough safe area for mobile cropping.

Image format and compression expectations:

- Prefer WebP for photographic or rendered artwork.
- Prefer SVG for simple icons, symbols, and favicon assets.
- Keep images visually clean at mobile and desktop sizes.
- Avoid committing oversized raw source exports to `public/media`.

Responsive breakpoints:

- Mobile: up to 680px.
- Tablet: 681px to 1100px.
- Desktop: above 1100px.

Performance targets:

- Keep production pages free of client console errors.
- Keep the initial page responsive on mobile.
- Avoid adding third-party analytics scripts until the observability task defines consent, provider, and loading strategy.
- Preserve the current Docker/Next build path and verify with `npm.cmd run build` before staging.
