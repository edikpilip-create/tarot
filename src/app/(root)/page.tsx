import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { detectPreferredLocale } from "@/lib/i18n/config";

export default async function RootRedirectPage() {
  const requestHeaders = await headers();
  const locale = detectPreferredLocale(requestHeaders.get("accept-language"));

  redirect(`/${locale}`);
}
