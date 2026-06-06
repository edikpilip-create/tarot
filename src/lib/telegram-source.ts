import { getLocaleName, type Locale } from "./i18n/config.ts";

export type TelegramSourcePayload = {
  languageCode: Locale;
  languageName: string;
  sourceUrl: string;
  sourceScreen: string;
  sourceForm: string;
  sourceButton: string;
  timestamp: string;
};

type GetRequestSourceArgs = {
  lang: Locale;
  pathname: string;
  hash?: string;
  formId: string;
  buttonId: string;
  now?: Date;
};

export function getRequestSource({
  lang,
  pathname,
  hash,
  formId,
  buttonId,
  now = new Date(),
}: GetRequestSourceArgs): TelegramSourcePayload {
  const normalizedHash = hash
    ? (hash.startsWith("#") ? hash : `#${hash}`)
    : "";

  return {
    languageCode: lang,
    languageName: getLocaleName(lang),
    sourceUrl: `${pathname}${normalizedHash}`,
    sourceScreen: normalizedHash ? normalizedHash.slice(1) : "top",
    sourceForm: formId,
    sourceButton: buttonId,
    timestamp: now.toISOString(),
  };
}
