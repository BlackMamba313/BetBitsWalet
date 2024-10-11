import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Импортируйте файлы перевода
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';
import translationFN from './locales/fn/translation.json';
import translationDE from './locales/de/translation.json';
import translationES from './locales/es/translation.json';

// Ресурсы перевода
const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  },
  fn: {
    translation: translationFN
  },
  de: {
    translation: translationDE
  },
  es: {
    translation: translationES
  }
};

i18n
  .use(initReactI18next) // привязка i18next к react-i18next
  .init({
    resources,
    lng: "ru", // язык по умолчанию
    fallbackLng: "en", // запасной язык
  });

export default i18n;
