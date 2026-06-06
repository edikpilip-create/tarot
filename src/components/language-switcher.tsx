"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { buildLocalizedPath, getSupportedLocales, type Locale } from "@/lib/i18n/config";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  ariaLabel: string;
};

export function LanguageSwitcher({ currentLocale, ariaLabel }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <div className="language-switcher" role="group" aria-label={ariaLabel}>
      {getSupportedLocales().map((locale) => (
        <Link
          key={locale}
          href={buildLocalizedPath(pathname || `/${currentLocale}`, locale, hash)}
          className={locale === currentLocale ? "is-active" : undefined}
          aria-current={locale === currentLocale ? "page" : undefined}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
