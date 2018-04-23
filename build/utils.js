'use strict'
/* 
  此配置文件是vue开发环境的wepack相关配置文件，主要用来处理css-loader和vue-style-loader 
*/
const path = require('path'); /* 引入nodejs路径模块 */
const config = require('../config'); /* 引入config目录下的index.js配置文件 */
const ExtractTextPlugin = require('extract-text-webpack-plugin'); /* 引入extract-text-webpack-plugin插件，用来将css提取到单独的css文件中 */
const packageConfig = require('../package.json');

/* exports其实就是一个对象，用来导出方法的最终还是使用module.exports，此处导出assetsPath 
所以这个方法的作用就是返回一个干净的相对根路径*/
exports.assetsPath = function(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory;
    /* path.join和path.posix.join的区别就是，前者返回的是完整的路径，后者返回的是完整路径的相对根路径 */
    return path.posix.join(assetsSubDirectory, _path)
};

/*  下面是导出cssLoaders的相关配置 */
exports.cssLoaders = function(options) {
    /* options如果没值就是空对象 */
    options = options || {};
    /* cssLoader的基本配置 */
    const cssLoader = {
        loader: 'css-loader',
        options: {
            /* 是否开启cssmap，默认是false */
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        /* 是否使用postCss */
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                /* 加载对应loader */
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
/* 下面这个主要处理import这种方式导入的文件类型的打包，上面的exports.cssLoaders是为这一步服务的 */
exports.styleLoaders = function(options) {
    const output = [];
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
}

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier'); /* 导入模块，用于node.js模块发送跨平台系统通知 */

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            /* 发生错误时的通知标题 */
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            /* 发生错误时的通知图标 */
            icon: path.join(__dirname, 'logo.png')
        })
    }
}