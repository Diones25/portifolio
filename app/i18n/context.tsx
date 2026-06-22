"use client";

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";
import enMessages from "./messages/en.json";
import ptBRMessages from "./messages/pt-BR.json";

export type Locale = "en" | "pt-BR";

type Messages = Record<string, unknown>;

const allMessages: Record<Locale, Messages> = {
  en: enMessages as unknown as Messages,
  "pt-BR": ptBRMessages as unknown as Messages,
};

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tm: (key: string) => unknown;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const msgsRef = useRef<Messages>(allMessages["en"]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    msgsRef.current = allMessages[newLocale];
    try {
      localStorage.setItem("portfolio-locale", newLocale);
    } catch {}
  }, []);

  const t = useCallback((key: string): string => {
    const value = getNestedValue(msgsRef.current, key);
    return typeof value === "string" ? value : key;
  }, []);

  const tm = useCallback((key: string): unknown => {
    return getNestedValue(msgsRef.current, key);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, tm }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useMessages() {
  const { tm } = useLocale();
  return tm;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useTranslations() {
  const { t } = useLocale();
  return t;
}

export type { Messages };
