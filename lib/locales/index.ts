/**
 * Locales
 */

import { I18n } from 'i18n-js'

import French from '@/lib/locales/fr'
import English from '@/lib/locales/en'

const Locales = new I18n({
  fr: French,
  en: English,
})

Locales.defaultLocale = 'fr'
Locales.enableFallback = true

export { Locales }
