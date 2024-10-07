// Core Configuration
export const siteUrl = 'https://docs.lupinum.com'

// Internationalization
export const strategy = 'prefix_except_default'

export const defaultLocale = 'en'
export const locales = [
  {
    code: 'en',
    language: 'en-US',
    name: 'English',
    icon: 'emojione:flag-for-united-kingdom'
  },
  {
    code: 'de',
    language: 'de-DE',
    name: 'Deutsch',
    icon: 'emojione:flag-for-germany'
  },
]

export const pages = {
  'wiki/index': {
    en: '/wiki',
    de: '/wiki',
  },
  '/': {
    en: '/',
    de: '/',
  },
}

export const getLocaleIcon = (code: string) => 
  locales.find(l => l.code === code)?.icon || 'heroicons:language'
