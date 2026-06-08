"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { languageSwitcherButtonRegistry } from "@/lib/buttons";
import { buildLanguageSwitcherPath, getSupportedLocales, type Locale } from "@/lib/i18n/config";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  ariaLabel: string;
  labels: Record<Locale, string>;
};

export function LanguageSwitcher({ currentLocale, ariaLabel, labels }: LanguageSwitcherProps) {
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
      {getSupportedLocales().map((locale) => {
        const button = languageSwitcherButtonRegistry[locale];

        return (
          <Link
            key={locale}
            href={buildLanguageSwitcherPath(pathname || `/${currentLocale}`, locale, hash)}
            className={locale === currentLocale ? "is-active" : undefined}
            aria-current={locale === currentLocale ? "page" : undefined}
            data-button-id={button.id}
          >
            {labels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
