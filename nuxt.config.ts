// https://nuxt.com/docs/api/configuration/nuxt-config

import { defaultLocale, locales, pages, siteUrl, strategy } from './nuxt.config-utils'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@vee-validate/nuxt',
    '@pinia/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/test-utils/module',
    '@nuxt/scripts',
  ],

  site: {
    url: siteUrl,
  },

  future: {
    compatibilityVersion: 4,
  },

  colorMode: {
    classPrefix: '',
    classSuffix: '',
    storage: 'cookie',
    storageKey: 'color-mode',
  },

  content: {
    navigation: {
      fields: ['group', 'description', 'duration', 'icon', 'status', 'date_published', 'date_modified', 'category', 'highlight', 'hero_image'],
    },
  },
  // https://github.com/nuxt/nuxt/issues/27544
  vite: {
    optimizeDeps: {
      exclude: ['vee-validate'],
    },
  },

  // 3. Internationalization
  i18n: {
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    strategy,
    defaultLocale,
    locales,
    customRoutes: 'config',
    pages,
  },

  runtimeConfig: {
    public: {
      siteUrl,
    },
  },

})