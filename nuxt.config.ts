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

  appConfig: {
    ui: {
      colors: {
      primary: 'teal',
      secondary: 'blue',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'mist'
      }
    }
  },

  modules: [
    '@nuxt/ui',
    '@nuxthub/core',
    '@nuxtjs/mdc',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
  },

  mdc: {
    highlight: {
      langs: Object.keys(bundledLanguages) as BundledLanguage[]
    }
  }
})