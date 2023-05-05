import 'react-i18next';

// import all namespaces (for the default language, only)
import translation from './public/locales/en/translation.json';
import shop_user from './public/locales/en/shop_user.json';
import common from './public/locales/en/common.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof translation;
      shop_user: typeof shop_user;
      common: typeof common;
    };
  }
}
