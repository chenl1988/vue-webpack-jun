'use strict'
const utils = require('./utils'); /* 导入同路径下的utils.js */
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'; /* 是否是生产模式 */
const sourceMapEnabled = isProduction ?
    config.build.productionSourceMap :
    config.dev.cssSourceMap

module.exports = {
    /* 载入utils中的cssloaders返回配置好的css-loader和vue-style-loader */
    loaders: utils.cssLoaders({
        sourceMap: sourceMapEnabled,
        extract: isProduction
    }),
    /* 是否开启css资源map */
    cssSourceMap: sourceMapEnabled,
    cacheBusting: config.dev.cacheBusting,
    transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}