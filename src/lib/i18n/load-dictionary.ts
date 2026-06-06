import en from "../../data/locales/en.json" with { type: "json" };
import ru from "../../data/locales/ru.json" with { type: "json" };
import uk from "../../data/locales/uk.json" with { type: "json" };

import { resolveLocale, type Locale } from "./config.ts";
import type { LocaleDictionary } from "./types.ts";

const dictionaries: Record<Locale, LocaleDictionary> = {
  en: en as LocaleDictionary,
  uk: uk as LocaleDictionary,
  ru: ru as LocaleDictionary
};

export function getDictionary(locale: Locale): LocaleDictionary {
  return dictionaries[resolveLocale(locale)];
}

export async function loadDictionary(locale: Locale): Promise<LocaleDictionary> {
  return getDictionary(locale);
}
