import 'react-i18next';
import enTranslation from './locales/en.json';

declare module 'react-i18next' {
  interface Resources {
    translation: typeof enTranslation;
  }
}
