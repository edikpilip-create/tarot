import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSupportedLocales, isLocale } from "@/lib/i18n/config";
import { loadDictionary } from "@/lib/i18n/load-dictionary";
import { buildLocaleMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSupportedLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const dictionary = await loadDictionary(lang);

  return buildLocaleMetadata(lang, dictionary);
}

export default async function LocalizedLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return children;
}
