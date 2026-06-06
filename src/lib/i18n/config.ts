export const supportedLocales = ["en", "uk", "ru"] as const;

export type Locale = (typeof supportedLocales)[number];

const localeNames: Record<Locale, string> = {
  en: "English",
  uk: "Українська",
  ru: "Русский",
};

export const defaultLocale: Locale = "en";

export function getSupportedLocales(): readonly Locale[] {
  return supportedLocales;
}

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function resolveLocale(input?: string | null): Locale {
  if (!input) {
    return defaultLocale;
  }

  const normalized = input.toLowerCase().replace(/_/g, "-");
  const [base] = normalized.split("-");

  return isLocale(base) ? base : defaultLocale;
}

export function detectPreferredLocale(acceptLanguage?: string | null): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const orderedCandidates = acceptLanguage
    .split(",")
    .map((item) => {
      const [tag, qualityPart] = item.trim().split(";q=");
      const quality = qualityPart ? Number.parseFloat(qualityPart) : 1;

      return {
        tag,
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .sort((left, right) => right.quality - left.quality);

  for (const candidate of orderedCandidates) {
    const locale = resolveLocale(candidate.tag);

    if (candidate.tag && locale !== defaultLocale) {
      return locale;
    }

    if (candidate.tag?.toLowerCase().startsWith("en")) {
      return "en";
    }
  }

  return defaultLocale;
}

export function getLocaleName(locale: Locale): string {
  return localeNames[locale];
}

export function buildLocalizedPath(pathname: string, targetLocale: Locale, hash?: string): string {
  const normalizedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const segments = normalizedPathname.split("/").filter(Boolean);
  const hasLocalePrefix = segments.length > 0 && isLocale(segments[0]);
  const remainingSegments = hasLocalePrefix ? segments.slice(1) : segments;
  const basePath = remainingSegments.length > 0
    ? `/${targetLocale}/${remainingSegments.join("/")}`
    : `/${targetLocale}`;

  return `${basePath}${normalizeHash(hash)}`;
}

function normalizeHash(hash?: string): string {
  if (!hash) {
    return "";
  }

  return hash.startsWith("#") ? hash : `#${hash}`;
}
