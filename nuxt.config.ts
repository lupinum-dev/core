// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@formkit/auto-animate/nuxt',
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
  ],

  colorMode: {
    classPrefix: '',
    classSuffix: '',
    storage: 'cookie',
    storageKey: 'color-mode',
  },

  content: {
    navigation: {
      fields: ['group', 'description', 'duration', 'icon', 'status'],
    },
  },
})
