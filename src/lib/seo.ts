import type { Metadata, MetadataRoute } from "next";

import { getSupportedLocales, type Locale } from "./i18n/config.ts";
import type { LocaleDictionary } from "./i18n/types.ts";

const localeToOpenGraphLocale: Record<Locale, string> = {
  en: "en_US",
  uk: "uk_UA",
  ru: "ru_RU",
};

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://artofseeing.example";
}

export function buildLocaleMetadata(
  locale: Locale,
  dictionary: LocaleDictionary,
  siteUrl: string = getSiteUrl(),
): Metadata {
  const canonicalPath = `/${locale}`;
  const alternateLanguages = Object.fromEntries(
    getSupportedLocales().map((entry) => [entry, `/${entry}`]),
  );

  return {
    metadataBase: new URL(siteUrl),
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords,
    authors: [{ name: "Art of Seeing" }],
    alternates: {
      canonical: canonicalPath,
      languages: {
        ...alternateLanguages,
        "x-default": "/en",
      },
    },
    openGraph: {
      title: dictionary.meta.siteName,
      description: dictionary.meta.ogDescription,
      url: `${siteUrl}${canonicalPath}`,
      siteName: dictionary.meta.siteName,
      images: [
        {
          url: "/og.svg",
          width: 1200,
          height: 630,
          alt: dictionary.meta.ogImageAlt,
        },
      ],
      locale: localeToOpenGraphLocale[locale],
      alternateLocale: getSupportedLocales()
        .filter((entry) => entry !== locale)
        .map((entry) => localeToOpenGraphLocale[entry]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.siteName,
      description: dictionary.meta.twitterDescription,
      images: ["/og.svg"],
    },
    icons: {
      icon: "/favicon.svg",
    },
  };
}

export function buildSitemapEntries(siteUrl: string = getSiteUrl()): MetadataRoute.Sitemap {
  return getSupportedLocales().map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));
}
