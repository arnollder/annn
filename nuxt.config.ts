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
      titleTemplate: '%s · Нижний Новгород',
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
    // Живой SSR: ежедневник и API не запекаются в статику
    '/': { prerender: false },
    '/groups': { prerender: true },
    '/groups/**': { prerender: true },
    '/komitety': { prerender: true },
    '/novichku': { prerender: true },
    '/calendar': { prerender: true },
    '/feniks': { prerender: true },
    '/contacts': { prerender: true },
    '/api/jft': { prerender: false, cache: false }
  },

  nitro: {
    preset: 'node-server',
    experimental: {
      tasks: true
    },
    // Внутри процесса (Croner) — без system crontab.
    // Каждый час :05; сам task парсит только 00:00–05:59 МСК.
    scheduledTasks: {
      '5 * * * *': ['jft:refresh']
    },
    storage: {
      data: {
        driver: 'fs',
        base: './.data'
      }
    },
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
