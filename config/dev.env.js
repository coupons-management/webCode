'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://39.98.53.2:3332/system/"'
  //BASE_API: '"http://39.98.53.2:3332/scrapy/"'
});
