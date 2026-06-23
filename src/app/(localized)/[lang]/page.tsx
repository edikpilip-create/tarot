import { notFound } from "next/navigation";

import HomePageClient from "@/components/home-page-client";
import { getLocalizedAssets } from "@/lib/assets";
import { isLocale } from "@/lib/i18n/config";
import { loadDictionary } from "@/lib/i18n/load-dictionary";

export default async function LocalizedHomePage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const dictionary = await loadDictionary(lang);
  const assets = getLocalizedAssets(lang);

  return <HomePageClient lang={lang} dictionary={dictionary} assets={assets} />;
}
