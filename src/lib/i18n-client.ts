import { translations } from './i18n';

export { translations, type Language, type TranslationKey } from './i18n';

if (typeof window !== 'undefined') {
  (window as any).__translations = translations;
}
