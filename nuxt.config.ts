// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-icon'],
  app: {
    head: {
      htmlAttrs: { lang: "en" },
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  css: ["@/assets/styles/global.scss", 'vuetify/lib/styles/main.sass'],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },  
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/_colors.scss";',
        },
      },
    },
  },
})
