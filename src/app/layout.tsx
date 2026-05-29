import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://artofseeing.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TARO «Путь Воина» | Авторская колода",
  description:
    "Авторская колода ТАРО «Путь Воина»: арканы, практики осознанности, тольтекская мудрость и интерактивный расклад.",
  keywords: [
    "ТАРО",
    "Путь Воина",
    "авторская колода",
    "тольтеки",
    "Кастанеда",
    "расклад таро",
  ],
  authors: [{ name: "Art of Seeing" }],
  openGraph: {
    title: "TARO «Путь Воина»",
    description:
      "Карты, которые вы держите в руках, это не ответы, а двери.",
    url: siteUrl,
    siteName: "TARO «Путь Воина»",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "TARO «Путь Воина»",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TARO «Путь Воина»",
    description:
      "Авторская колода ТАРО как проводник к практике осознанности.",
    images: ["/og.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080806",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
