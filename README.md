# TARO "The Path of the Warrior"

Multilingual landing page for an author tarot deck, built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Runtime

Use Node.js `22.22.3` and npm `10.9.8`. These versions are declared in `package.json` and used by every Docker stage.

## Deployment Target

Production is planned for a self-hosted VPS running Dokploy with Docker. The canonical production origin is `https://tarotwarriorpath.com`; `www.tarotwarriorpath.com` should redirect to the apex hostname.

## Local Development

Create `.env.local` from `.env.example`, set `NEXT_PUBLIC_SITE_URL=http://localhost:3000`, and add Telegram credentials when testing lead delivery.

```powershell
npm.cmd ci
npm.cmd run test
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

The localized pages are:

- `/en`
- `/uk`
- `/ru`

The root route `/` detects `Accept-Language` and redirects to a supported locale, falling back to `/en`.

## Architecture

- `src/app/(localized)/[lang]/page.tsx` loads a locale dictionary and localized assets.
- `src/components/home-page-client.tsx` contains the interactive landing page and lead form.
- `src/data/locales/*.json` contains localized copy and metadata.
- `src/app/api/telegram/route.ts` validates and sends lead submissions to Telegram.
- `src/lib/seo.ts` owns canonical URLs, localized metadata, indexing policy, robots policy, and sitemap entries.
- `src/lib/analytics.ts` defines the planned analytics event contract without loading a provider.
- `public/media` contains visual assets.

## Production

Production setup, Docker commands, environment variables, rollback, smoke tests, indexing controls, SEO policy, analytics events, and the anti-spam plan are documented in `docs/deployment.md`.

The conversion model, macro conversion rule, privacy-safe analytics parameters, and design inputs for staging QA are documented in `docs/conversion-model.md`.
