'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        /* 
            代理配置表 这里可以配置特定的请求代理到对应的API接口 
            例如将“localhost:8080/api/xxx”代理到“www.example.com/api/xxx”
        */

        proxyTable: {
            '/cros': {
                /* 接口的域名 */
                target: 'https://baidu.com/wgame4/otcar412/admin/index.php',
                /* 如果接口跨域，需要配置这个参数 */
                changeOrigin: true,
                pathRewrite: {
                    '^/cros': '/'
                }
            }
        },

        // Various Dev Server settings
        // host: 'localhost', // can be overwritten by process.env.HOST
        host: '0.0.0.0', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: true,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },
    /* 配置npm run build时候的参数 基本定义了一些常量 */
    build: {
        // Template for index.html
        /* 本地文件系统上的绝对路径 */
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        /* 配置打包后的目录 /wgame4/otcar412/：服务器上的目录*/
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/wgame4/otcar412/dist/',

        /**
         * Source Maps
         */

        // productionSourceMap: true,
        /* 打包时关闭sourceMap功能 ，否则打包会有.js.map文件，在生产环境中也可以调试 */
        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        // devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        /* 是否开启压缩 */
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}