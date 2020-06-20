/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */


module.exports = {
  mode: 'spa', // or 'universal'
  head: {
    title: 'lora-sniffer-client'
  },
  loading: false,
  plugins: [
    {ssr: true, src: '@/plugins/icons.js'},
    '@/plugins/vue-highlgiht.js'
  ],
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    
  ],
  css: [ 'highlight.js/styles/github.css' ]
};
