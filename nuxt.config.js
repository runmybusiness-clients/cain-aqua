// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-icon", "@nuxtjs/supabase"],
  supabase: {
    redirect: false
  },
  ssr: false,
  css: ['~/assets/css/tiptap.css'],
  runtimeConfig: {
    public: {
      ANON_KEY: process.env.ANON_KEY,
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Cain Aqua',
      description: 'Cain Aqua is emerging as India’s Brand leader in Home & Commercial Appliances segment. The vision is to be the most trusted brand in this segment having equal prominence on the global platform.'
    }
  }
})