# Carousel Images Guide

This file explains, in simple terms, how the carousel images work and how to update them.

## How the carousel works

- The list of carousel slides is defined in [src/lib/assets.ts](C:/Users/edikp/Desktop/artofseeing/src/lib/assets.ts).
- Each slide has:
  - an `id`
  - a front image
  - a back image
- The site first looks for a language-specific image in:
  - `public/media/locales/en/carousel/`
  - `public/media/locales/uk/carousel/`
  - `public/media/locales/ru/carousel/`
- If a language-specific file does not exist, the site falls back to the shared image in `public/media/`.

## 1. Replace an existing carousel image

If you want to replace an image for only one language:

1. Find the slide in the table below.
2. Copy the expected filename exactly.
3. Put your new file into the matching language folder.

Example:
- To replace the English image for `card-1`, upload:
  - `public/media/locales/en/carousel/carousel-lovers.webp`

If you want to replace the image for all languages at once:

1. Replace the shared file in `public/media/`.
2. Keep the same filename.

Example:
- Replace `public/media/carousel-lovers.webp`

Important:
- The filename must stay exactly the same unless you also change [src/lib/assets.ts](C:/Users/edikp/Desktop/artofseeing/src/lib/assets.ts).

## 2. Add a new carousel slide

To add a new slide:

1. Open [src/lib/assets.ts](C:/Users/edikp/Desktop/artofseeing/src/lib/assets.ts).
2. Find the `sharedAssets.carouselCards` array.
3. Add one new object with:
   - a new unique `id`
   - `frontSrc`
   - `backSrc`
4. Add matching alt text entries to:
   - [src/data/locales/en.json](C:/Users/edikp/Desktop/artofseeing/src/data/locales/en.json)
   - [src/data/locales/uk.json](C:/Users/edikp/Desktop/artofseeing/src/data/locales/uk.json)
   - [src/data/locales/ru.json](C:/Users/edikp/Desktop/artofseeing/src/data/locales/ru.json)
5. Upload the shared image files into `public/media/`.
6. If needed, also upload language-specific overrides into the locale folders.

Example shape in `assets.ts`:

```ts
{
  id: "card-7",
  frontSrc: "/media/carousel-new-card.webp",
  backSrc: "/media/carousel-new-card-back.webp",
}
```

Then add matching alt text objects with the same `id` to each locale JSON file.

## 3. Remove a carousel slide

To remove a slide:

1. Open [src/lib/assets.ts](C:/Users/edikp/Desktop/artofseeing/src/lib/assets.ts).
2. Find the slide object in `sharedAssets.carouselCards`.
3. Delete that object.
4. Remove the matching alt text entry with the same `id` from:
   - [src/data/locales/en.json](C:/Users/edikp/Desktop/artofseeing/src/data/locales/en.json)
   - [src/data/locales/uk.json](C:/Users/edikp/Desktop/artofseeing/src/data/locales/uk.json)
   - [src/data/locales/ru.json](C:/Users/edikp/Desktop/artofseeing/src/data/locales/ru.json)
5. Optionally delete unused image files from `public/media/` and `public/media/locales/*/carousel/`.

Important:
- The `id` list in `assets.ts` and the `id` list in each locale JSON should stay in sync.

## 4. Edit alt text for each language

Alt text is stored in the locale JSON files, not in `assets.ts`.

Edit these files:

- English: [src/data/locales/en.json](C:/Users/edikp/Desktop/artofseeing/src/data/locales/en.json)
- Ukrainian: [src/data/locales/uk.json](C:/Users/edikp/Desktop/artofseeing/src/data/locales/uk.json)
- Russian: [src/data/locales/ru.json](C:/Users/edikp/Desktop/artofseeing/src/data/locales/ru.json)

Look for the `carousel.cards` array.

Each slide has:

- `frontAlt`
- `backAlt`

Example:

```json
{ "id": "card-1", "frontAlt": "The Lovers", "backAlt": "The Lovers card back" }
```

If you change the meaning or artwork of a slide, update the alt text in all three language files.

## Current slide table

This table lists the current front-image filenames expected by the code for each slide.

| Slide ID | Expected English image path | Expected Ukrainian image path | Expected Russian image path | Related alt text location |
| --- | --- | --- | --- | --- |
| `card-1` | `public/media/locales/en/carousel/carousel-lovers.webp` | `public/media/locales/uk/carousel/carousel-lovers.webp` | `public/media/locales/ru/carousel/carousel-lovers.webp` | `src/data/locales/en.json -> carousel.cards[id="card-1"]`, `src/data/locales/uk.json -> carousel.cards[id="card-1"]`, `src/data/locales/ru.json -> carousel.cards[id="card-1"]` |
| `card-2` | `public/media/locales/en/carousel/carousel-mage.webp` | `public/media/locales/uk/carousel/carousel-mage.webp` | `public/media/locales/ru/carousel/carousel-mage.webp` | `src/data/locales/en.json -> carousel.cards[id="card-2"]`, `src/data/locales/uk.json -> carousel.cards[id="card-2"]`, `src/data/locales/ru.json -> carousel.cards[id="card-2"]` |
| `card-3` | `public/media/locales/en/carousel/carousel-power.webp` | `public/media/locales/uk/carousel/carousel-power.webp` | `public/media/locales/ru/carousel/carousel-power.webp` | `src/data/locales/en.json -> carousel.cards[id="card-3"]`, `src/data/locales/uk.json -> carousel.cards[id="card-3"]`, `src/data/locales/ru.json -> carousel.cards[id="card-3"]` |
| `card-4` | `public/media/locales/en/carousel/carousel-sun.webp` | `public/media/locales/uk/carousel/carousel-sun.webp` | `public/media/locales/ru/carousel/carousel-sun.webp` | `src/data/locales/en.json -> carousel.cards[id="card-4"]`, `src/data/locales/uk.json -> carousel.cards[id="card-4"]`, `src/data/locales/ru.json -> carousel.cards[id="card-4"]` |
| `card-5` | `public/media/locales/en/carousel/carousel-zhrica.webp` | `public/media/locales/uk/carousel/carousel-zhrica.webp` | `public/media/locales/ru/carousel/carousel-zhrica.webp` | `src/data/locales/en.json -> carousel.cards[id="card-5"]`, `src/data/locales/uk.json -> carousel.cards[id="card-5"]`, `src/data/locales/ru.json -> carousel.cards[id="card-5"]` |
| `card-6` | `public/media/locales/en/carousel/carousel-otshelnik.webp` | `public/media/locales/uk/carousel/carousel-otshelnik.webp` | `public/media/locales/ru/carousel/carousel-otshelnik.webp` | `src/data/locales/en.json -> carousel.cards[id="card-6"]`, `src/data/locales/uk.json -> carousel.cards[id="card-6"]`, `src/data/locales/ru.json -> carousel.cards[id="card-6"]` |

## Shared fallback images

If a language-specific file is missing, the carousel uses these shared files from `public/media/`:

- `carousel-lovers.webp`
- `carousel-lovers-back.webp`
- `carousel-mage.webp`
- `carousel-mage-back.webp`
- `carousel-power.webp`
- `carousel-power-back.webp`
- `carousel-sun.webp`
- `carousel-zhrica.webp`
- `carousel-zhrica-back.webp`
- `carousel-otshelnik.webp`
- `carousel-otshelnik-back.webp`

Note:
- `card-4` currently uses `carousel-sun.webp` as the front image and `carousel-power-back.webp` as the back image, because that is how the current code is configured in [src/lib/assets.ts](C:/Users/edikp/Desktop/artofseeing/src/lib/assets.ts).
