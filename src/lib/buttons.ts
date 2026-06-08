import type { Locale } from "./i18n/config.ts";

export const buttonRegistry = {
  brand: {
    id: "brand-home",
    href: "#top",
  },
  navWisdom: {
    id: "nav-wisdom",
    href: "#wisdom",
  },
  navStructure: {
    id: "nav-structure",
    href: "#structure",
  },
  navSpread: {
    id: "nav-spread",
    href: "#spread",
  },
  navContact: {
    id: "nav-contact",
    href: "#contact",
  },
  heroCta: {
    id: "hero-draw-spread",
    href: "#spread",
  },
  spreadDraw: {
    id: "spread-draw",
  },
  submitLead: {
    id: "submit-lead-form",
  },
} as const;

export const languageSwitcherButtonRegistry: Record<Locale, { id: string; locale: Locale }> = {
  en: {
    id: "lang-switch-en",
    locale: "en",
  },
  uk: {
    id: "lang-switch-uk",
    locale: "uk",
  },
  ru: {
    id: "lang-switch-ru",
    locale: "ru",
  },
};

export const formRegistry = {
  lead: {
    id: "lead-form",
    submitButtonId: buttonRegistry.submitLead.id,
  },
} as const;
