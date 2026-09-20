// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light',
    fallback: 'light'
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      titleTemplate: '%s · АННН',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap'
        }
      ]
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/groups': { prerender: true },
    '/groups/**': { prerender: true },
    '/novichku': { prerender: true },
    '/calendar': { prerender: true },
    '/feniks': { prerender: true },
    '/contacts': { prerender: true }
  },

  nitro: {
    prerender: {
      crawlLinks: true
    }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
