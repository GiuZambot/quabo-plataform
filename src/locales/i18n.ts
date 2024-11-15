import en from './en.json'
import es from './es.json'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ptBR from './pt-BR.json'
import { initReactI18next } from 'react-i18next'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: ptBR },
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
