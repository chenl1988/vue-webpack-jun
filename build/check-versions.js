'use strict'
/* 主要是用来检测当前环境中的node和npm版本和我们需要的是否一致的。 */
const chalk = require('chalk'); /*[定制控制台日志的输入样式] 是一个颜色的插件。可以通过chalk.blue(‘hello world’)来改变颜色 */
const semver = require('semver'); /* 加载语义化版本测试库 */
const packageConfig = require('../package.json'); /* 引入package.json文件 */
const shell = require('shelljs'); /* shelljs 模块重新包装了 child_process，调用系统命令更加方便 */

/* 脚本可以通过child_process模块新建子进程，从而执行Unix系统命令 */
function exec(cmd) {
    /* 将cmd参数传递的值转换成前后没有空格的字符串，也就是版本号 */
    return require('child_process').execSync(cmd).toString().trim()
}
/* 定义node和npm版本需求所组成的数组 */
const versionRequirements = [{
    name: 'node',
    /* 使用semver插件，把版本信息转换成规定格式 */
    currentVersion: semver.clean(process.version),
    /* 规定package.json中engines选项的node版本信息 */
    versionRequirement: packageConfig.engines.node
}]

/* which为linux指令，在$path规定的路径下查找符合条件的文件 */
if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        /* 调用npm --version命令，并且把参数返回给exec函数获取纯净版本 */
        currentVersion: exec('npm --version'),
        /* 规定package.json中engines选项的npm版本信息 */
        versionRequirement: packageConfig.engines.npm
    })
}

module.exports = function() {
    const warnings = [];
    /* 依次判断版本是否符合要求 */
    for (let i = 0; i < versionRequirements.length; i++) {
        const mod = versionRequirements[i];
        /* 如果版本号不符合package.json文件中指定的版本号，就执行warning.push... */
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            /* 当前版本号用红色标识，要求版本号用绿色标识 */
            warnings.push(mod.name + ': ' +
                chalk.red(mod.currentVersion) + ' should be ' +
                chalk.green(mod.versionRequirement)
            )
        }
    }

    /* 如果为真，则打印提示用户升级新版本 */
    if (warnings.length) {
        console.log('')
        console.log(chalk.yellow('To use this template, you must update following to modules:'))
        console.log()

        for (let i = 0; i < warnings.length; i++) {
            const warning = warnings[i]
            console.log('  ' + warning)
        }

        console.log()
        process.exit(1)
    }
}