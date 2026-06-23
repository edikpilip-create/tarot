import type { Viewport } from "next";

import { defaultLocale } from "@/lib/i18n/config";

import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080806"
};

export default function RootRedirectLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale}>
      <body>{children}</body>
    </html>
  );
}
