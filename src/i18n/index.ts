import i18n from 'i18n-js'
import { findBestAvailableLanguage } from 'react-native-localize'

import { NestedObjectKeys } from '@/utils'

import { en, pt } from './locales'
import { Language } from './locales/types'

const translations = {
  en,
  pt
}

const fallback = { languageTag: 'pt', isRTL: false }

const locale = findBestAvailableLanguage(Object.keys(translations)) || fallback

i18n.translations = translations

i18n.locale = locale.languageTag

type T = (
  scope: NestedObjectKeys<Language>,
  options?: i18n.TranslateOptions
) => string

export const t: T = i18n.t

export const language = locale.languageTag
