# TARO «Путь Воина»

Лендинг авторской колоды ТАРО на Next.js App Router, TypeScript и Tailwind CSS.

## Запуск

```bash
npm install
npm run dev
```

## Telegram-заявки

API-роут `POST /api/telegram` отправляет заявку в Telegram. Для Dokploy/VPS задайте переменные окружения:

```bash
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
NEXT_PUBLIC_SITE_URL=https://ваш-домен
```

## Медиа

Когда будут готовы реальные фото и видео, положите их в `public/media` и замените плейсхолдеры в `src/app/page.tsx`.
