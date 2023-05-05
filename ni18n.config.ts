const supportedLngs = ['en', 'fr', 'ht'];

//En
import translation from 'public/locales/en/translation.json';
import shop_user from 'public/locales/en/shop_user.json';
import common from 'public/locales/en/shop_user.json';

//Fr
import translation_fr from 'public/locales/fr/translation.json';
import common_fr from 'public/locales/fr/common.json';
import shop_user_fr from 'public/locales/fr/shop_user.json';

//Ht
import translation_ht from 'public/locales/ht/translation.json';
import common_ht from 'public/locales/ht/common.json';
import shop_user_ht from 'public/locales/ht/shop_user.json';
import { Ni18nOptions } from 'ni18n';

export const resources = {
  en: {
    translation,
    shop_user,
    common,
  },
  fr: {
    translation: translation_fr,
    shop_user: shop_user_fr,
    common: common_fr,
  },
  ht: {
    translation: translation_ht,
    shop_user: shop_user_ht,
    common: common_ht,
  },
} as const;

export const ni18nConfig: Ni18nOptions = {
  resources,
  fallbackLng: supportedLngs,
  supportedLngs,
  ns: ['translation', 'shop_user'],
};
