'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import en from './locales/en.json';
import ru from './locales/ru.json';
import cz from './locales/cz.json';

export type Locale = 'en' | 'ru' | 'cz';

const locales: Record<Locale, typeof en> = { en, ru, cz };

type NestedKeyOf<T> = T extends object
  ? { [K in keyof T]: K extends string ? (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : K) : never }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<typeof en>;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any = locales[locale];
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Fallback to English
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let fallback: any = locales['en'];
          for (const fk of keys) {
            fallback = fallback?.[fk];
          }
          return typeof fallback === 'string' ? fallback : key;
        }
      }
      return typeof value === 'string' ? value : key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
