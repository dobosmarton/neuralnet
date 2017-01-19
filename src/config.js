require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Probapply',
    description: '',
    head: {
      meta: [
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Probapply'},
        {property: 'og:locale', content: 'hu_HU'},
        {property: 'og:title', content: 'Probapply'}
      ]
    }
  },

}, environment);
