import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  contact?: string;
  message?: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as LeadPayload | null;

  if (
    !payload ||
    typeof payload.name !== "string" ||
    typeof payload.contact !== "string" ||
    !payload.name.trim() ||
    !payload.contact.trim()
  ) {
    return NextResponse.json(
      { ok: false, message: "Заполните имя и контакт." },
      { status: 400 },
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, message: "Telegram не настроен на сервере." },
      { status: 500 },
    );
  }

  const text = [
    "<b>Новая заявка с лендинга TARO «Путь Воина»</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(payload.name.trim())}`,
    `<b>Контакт:</b> ${escapeHtml(payload.contact.trim())}`,
    typeof payload.message === "string" && payload.message.trim()
      ? `<b>Сообщение:</b> ${escapeHtml(payload.message.trim())}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { ok: false, message: "Не удалось отправить заявку." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
