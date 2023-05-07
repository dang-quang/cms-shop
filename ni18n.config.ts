const supportedLngs = ['en', 'fr', 'ht'];

//En
import translation from 'public/locales/en/translation.json';

//Fr
import translation_fr from 'public/locales/fr/translation.json';

//Ht
import translation_ht from 'public/locales/ht/translation.json';
import { Ni18nOptions } from 'ni18n';

export const resources = {
  en: {
    translation,
  },
  fr: {
    translation: translation_fr,
  },
  ht: {
    translation: translation_ht,
  },
} as const;

export const ni18nConfig: Ni18nOptions = {
  resources,
  fallbackLng: supportedLngs,
  supportedLngs,
  ns: ['translation'],
};
