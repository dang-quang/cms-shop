const supportedLngs = ['en', 'fr', 'ht']

export const ni18nConfig = {
    fallbackLng: supportedLngs,
    supportedLngs,
    ns: ['translation'],
    react: {
        useSuspense: false,
    },
}