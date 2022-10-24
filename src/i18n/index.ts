import i18n from 'i18n-js'
import { findBestAvailableLanguage } from 'react-native-localize'

import { en, pt } from './locales'

const translations = {
  en,
  pt
}

const fallback = { languageTag: 'pt', isRTL: false }

const locale = findBestAvailableLanguage(Object.keys(translations)) || fallback

i18n.translations = translations

i18n.locale = locale.languageTag

export const t = i18n.t

export const language = locale.languageTag
