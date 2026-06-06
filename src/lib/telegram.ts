import { getDictionary } from "./i18n/load-dictionary.ts";
import { getLocaleName, resolveLocale, type Locale } from "./i18n/config.ts";
import type { TelegramSourcePayload } from "./telegram-source.ts";

type LeadPayloadShape = Partial<TelegramSourcePayload> & {
  name?: string;
  contact?: string;
  message?: string;
  languageCode?: string;
};

export type ValidLeadPayload = TelegramSourcePayload & {
  name: string;
  contact: string;
  message?: string;
};

type ValidationSuccess = {
  ok: true;
  data: ValidLeadPayload;
};

type ValidationFailure = {
  ok: false;
  status: number;
  message: string;
};

export function validateLeadPayload(payload: unknown): ValidationSuccess | ValidationFailure {
  const candidate = isRecord(payload) ? payload as LeadPayloadShape : {};
  const locale = resolveLocale(candidate.languageCode);
  const messages = getDictionary(locale).feedback.api;

  const name = normalizeText(candidate.name);
  const contact = normalizeText(candidate.contact);
  const message = normalizeText(candidate.message);
  const sourceUrl = normalizeText(candidate.sourceUrl);
  const sourceScreen = normalizeText(candidate.sourceScreen);
  const sourceForm = normalizeText(candidate.sourceForm);
  const sourceButton = normalizeText(candidate.sourceButton);
  const timestamp = normalizeText(candidate.timestamp);

  if (!name || !contact || !sourceUrl || !sourceScreen || !sourceForm || !sourceButton || !timestamp) {
    return {
      ok: false,
      status: 400,
      message: messages.validation,
    };
  }

  return {
    ok: true,
    data: {
      name,
      contact,
      message,
      languageCode: locale,
      languageName: normalizeText(candidate.languageName) || getLocaleName(locale),
      sourceUrl,
      sourceScreen,
      sourceForm,
      sourceButton,
      timestamp,
    },
  };
}

export function formatTelegramMessage(payload: ValidLeadPayload): string {
  return [
    "<b>Новая заявка с лендинга TARO «Путь Воина»</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(payload.name)}`,
    `<b>Контакт:</b> ${escapeHtml(payload.contact)}`,
    payload.message ? `<b>Сообщение:</b> ${escapeHtml(payload.message)}` : "",
    `<b>Язык:</b> ${escapeHtml(payload.languageName)} (${escapeHtml(payload.languageCode)})`,
    `<b>Источник:</b> ${escapeHtml(payload.sourceUrl)}`,
    `<b>Секция:</b> ${escapeHtml(payload.sourceScreen)}`,
    `<b>Форма:</b> ${escapeHtml(payload.sourceForm)}`,
    `<b>Кнопка:</b> ${escapeHtml(payload.sourceButton)}`,
    `<b>Время:</b> ${escapeHtml(payload.timestamp)}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function getApiErrorMessage(locale: Locale, type: "serverMisconfigured" | "deliveryFailed"): string {
  return getDictionary(locale).feedback.api[type];
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function normalizeText(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
