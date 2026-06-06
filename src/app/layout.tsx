import type { Viewport } from "next";

import { defaultLocale, resolveLocale } from "@/lib/i18n/config";

import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080806"
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params?: Promise<{ lang?: string }>;
}>) {
  const resolvedParams = params ? await params : undefined;
  const lang = resolvedParams?.lang ? resolveLocale(resolvedParams.lang) : defaultLocale;

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
