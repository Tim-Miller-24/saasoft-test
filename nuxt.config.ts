// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  nitro: {
    compressPublicAssets: true,
    vercel: {
      functions: {
        maxDuration: 300,
      }
    }
  },

  css: [
    '@/assets/styles/_reset.css',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/styles/_global.scss";
          `,
        },
      },
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      title: 'Saasoft-test',
      meta: [
        {
          name: 'description',
          content: '',
        },
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
      ],
    },
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
  },

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@element-plus/nuxt',
    '@nuxt/icon'
  ],

  piniaPersistedstate: {
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    },
  },

  pinia: {
    storesDirs: ['./store/**'],
  },

  compatibilityDate: '2024-08-29'
})