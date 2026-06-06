import { NextResponse } from "next/server";

import { formatTelegramMessage, getApiErrorMessage, validateLeadPayload } from "@/lib/telegram";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const validation = validateLeadPayload(payload);

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, message: validation.message },
      { status: validation.status }
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, message: getApiErrorMessage(validation.data.languageCode, "serverMisconfigured") },
      { status: 500 }
    );
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatTelegramMessage(validation.data),
      parse_mode: "HTML",
      disable_web_page_preview: true
    })
  });

  if (!response.ok) {
    return NextResponse.json(
      { ok: false, message: getApiErrorMessage(validation.data.languageCode, "deliveryFailed") },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
