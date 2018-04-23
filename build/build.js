'use strict' /* es5 严格模式 */
require('./check-versions')(); /* 检查nodet和npm版本 */

process.env.NODE_ENV = 'production'; /* 设置环境变量为生产模式 */

const ora = require('ora'); /* 主要用来实现node.js命令行环境的loading效果，和显示各种状态的图标等 */
const rm = require('rimraf'); /* rimraf 包的作用：以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除 */
const path = require('path'); /*  path 模块提供了一些用于处理文件路径的小工具 */
const chalk = require('chalk'); /* 是一个颜色的插件。可以通过chalk.blue(‘hello world’)来改变颜色 */
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('building for production...'); /* 实现loading的模块 */
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
        spinner.stop(); /* 结束loading */
        if (err) throw err;
        /* 这些是编译过程中，持续打印信息 */
        process.stdout.write(stats.toString({
            /* 增加控制台颜色开关 */
            colors: true,
            /* 是否增加内置模块信息 */
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        /* 编译出错的消息 */
        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }
        /* 编译成功的消息 */
        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
})