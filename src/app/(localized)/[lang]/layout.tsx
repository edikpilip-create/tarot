import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { getSupportedLocales, isLocale } from "@/lib/i18n/config";
import { loadDictionary } from "@/lib/i18n/load-dictionary";
import { buildLocaleMetadata } from "@/lib/seo";

import "../../globals.css";

export const dynamicParams = false;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080806"
};

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

export default async function LocalizedRootLayout({
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

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
