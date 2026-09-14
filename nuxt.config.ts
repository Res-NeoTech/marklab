import { bundledLanguages, type BundledLanguage } from 'shiki'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  hub: {
    db: "postgresql",
    kv: true
  },
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxthub/core',
    '@formkit/auto-animate',
    '@nuxtjs/mdc',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],

  mdc: {
    highlight: {
      langs: Object.keys(bundledLanguages) as BundledLanguage[]
    }
  }
})