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
})