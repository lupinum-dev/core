// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vueuse/motion/nuxt',
    '@nuxt/image',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    classPrefix: '',
    classSuffix: '',
    storage: 'cookie',
    storageKey: 'color-mode',
  },
})
