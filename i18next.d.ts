import 'react-i18next';

// import all namespaces (for the default language, only)
import translation from './public/locales/en/translation.json';
import common from './public/locales/en/common.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof translation;
      common: typeof common;
    };
  }
}
