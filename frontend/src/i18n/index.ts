import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mr from "./locales/mr.json";

export const languageNames = {
  en: "English",
  hi: "Hindi",
  mr: "Marathi",
} as const;

export type LanguageCode = keyof typeof languageNames;

const savedLanguage = localStorage.getItem("language");
const migratedLanguage =
  savedLanguage === "Hindi"
    ? "hi"
    : savedLanguage === "Marathi"
      ? "mr"
      : savedLanguage === "English"
        ? "en"
        : savedLanguage;
const initialLanguage =
  migratedLanguage && migratedLanguage in languageNames
    ? migratedLanguage
    : "en";

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    mr: { translation: mr },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.lang = initialLanguage;
document.documentElement.dir = "ltr";

i18n.on("languageChanged", (language) => {
  localStorage.setItem("language", language);
  document.documentElement.lang = language;
});

export default i18n;
