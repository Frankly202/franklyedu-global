import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "en" | "tr";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: () => {},
  toggleLocale: () => {},
});

const STORAGE_KEY = "frankedu_locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === "en" || saved === "tr") {
        setLocaleState(saved);
      }
    } catch {
      // In environments where localStorage is restricted, default to English gracefully
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    try {
      localStorage.setItem(STORAGE_KEY, nextLocale);
    } catch {
      // ignore
    }
  };

  const toggleLocale = () => {
    const next = locale === "en" ? "tr" : "en";
    setLocale(next);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLocale() {
  return useContext(LocaleContext);
}
