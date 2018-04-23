'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config'); //../config/index.js
/* 引入webpack-merge插件用来合并webpack配置对象，也就是说可以把webpack配置文件拆分成几个小的模块，然后合并 */
const merge = require('webpack-merge');
const path = require('path')
    /* 导入webpack基本配置 */
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

/* 合并模块，第一个参数是webpack基本配置文件webpack.base.conf.js中的配置 */
const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        /* 创建模块时匹配请求的规则数组，这里调用了utils中的配置模板 */
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    // cheap-module-eval-source-map is faster for development
    /* debtool是开发工具选项，用来指定如何生成sourcemap文件，cheap-module-eval-source-map此款soucemap文件性价比最高 */
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    /* webpack服务器配置 */
    devServer: {
        /* 使用内联模式时，在开发工具的控制台将显示消息，可取的值有none error warning info */
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },
        /* 是否启用webpack的模块热替换特性。这个功能主要是用于开发过程中，对生产环境无帮助。效果上就是界面无刷新更新。 */
        hot: true,
        /* 这里禁用了该功能。本来是告诉服务器从哪里提供内容，一半是本地静态资源。 */
        contentBase: false, // since we use CopyWebpackPlugin.
        /* 一切服务是否都启用gzip压缩 */
        compress: true,
        /* 指定一个host,默认是localhost。如果有全局host就用全局，否则就用index.js中的设置。 */
        host: HOST || config.dev.host,
        /* 指定端口 */
        port: PORT || config.dev.port,
        /* 是否在浏览器开启本dev server */
        open: config.dev.autoOpenBrowser,
        /* 当有编译器错误时，是否在浏览器中显示全屏覆盖。 */
        overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
        /* 此路径下的打包文件可在浏览器中访问 */
        publicPath: config.dev.assetsPublicPath,
        /* 如果你有单独的后端开发服务器api,并且希望在同域名下发送api请求，那么代理某些URL会很有用。 */
        proxy: config.dev.proxyTable,
        /*  启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。 */
        quiet: true, // necessary for FriendlyErrorsPlugin
        /* webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下使用轮询。 */
        watchOptions: {
            /* 是否使用轮询 */
            poll: config.dev.poll,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            /* 生成的文件的名称 */
            filename: 'index.html',
            /* 可以指定模块html文件 */
            template: 'index.html',
            inject: true
        }),
        // 将单个文件或整个文件复制到构建目录
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.dev.assetsSubDirectory,
            ignore: ['.*']
        }])
    ]
})

/* webpack将运行由配置文件导出的函数，并且等待promise返回，便于需要异步地加载所需的配置变量。 */
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
                // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            /* 出错友好处理插件 */
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                /* build成功的话会执行者块 */
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                /* 如果出错就执行这块,其实是utils里面配置好的提示信息 */
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() : undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})