'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

/* 返回当前目录的平行目录的路径 */
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

module.exports = {
    context: path.resolve(__dirname, '../'),
    /* 编译入口文件 */
    entry: {
        app: './src/main.js'
    },
    /* 编译输出路径 */
    output: {
        /* 打包后文件输出路径 */
        path: config.build.assetsRoot,
        /* 输出文件名字 */
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    /* 一些解决方案配置 */
    resolve: {
        /* 省略扩展名 */
        extensions: ['.js', '.vue', '.json'],
        alias: {
            /* $符号指精确匹配，路径和文件名要详细 */
            'vue$': 'vue/dist/vue.esm.js',
            /* 指的是项目根目录中的src文件夹目录，导入文件的时候路径可以简写 import somejs from @/some.js */
            '@': resolve('src'),
            'view': resolve('src/view'),
            'components': resolve('src/components'),
            'style': resolve('src/style'),
            'api': resolve('src/api'),
        }
    },
    module: {
        /* 各种不同类型文件加载器配置 */
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                /* 将vueLoaderConfig当做参数传递给vue-router，解析css相关文件 */
                options: vueLoaderConfig
            },
            {
                /* js文件用babel转码 */
                /* include: [resolve('src')] 一些插件js如果出现es6->es5出错可以通过配置 resolve('目录') 来指定加载哪个文件*/
                test: /\.js$/,
                loader: 'babel-loader',
                /* 指明src,test,client目录下的js文件要使用该loader */
                include: [resolve('src'), resolve('config'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                /* 图片使用url-loader插件，将图片转为base64格式 */
                loader: 'url-loader',
                options: {
                    /* 10000个字节以下的文件才用来转base64 */
                    limit: 10000,
                    /* 超过10000字节的图片，就按照制定规则设置生成的图片名称 7位hash码 .ext文件是一种索引式文件系统 */
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                /* 处理字体相关 */
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                /* 添加less */
                test: /\.less$/, //less-loader引用
                loader: "style-loader!css-loader!less-loader",
                options: { //css样式前缀
                    postcss: [require('autoprefixer')],
                }
            }
        ]
    },
    /* 每个属性都是node.js全局变量或模块的名称 value为empty表示提供空对象 */
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}