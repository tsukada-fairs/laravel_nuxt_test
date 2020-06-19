const laravelNuxt = require("laravel-nuxt");

module.exports = laravelNuxt({
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: [
    { src: '@/plugins/vee-validate'},
    { src: '@/plugins/vue-long-click'}
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // 'nuxt-laravel', //追加
    // "@nuxtjs/axios",
    // '@nuxtjs/proxy'
  ],
})
