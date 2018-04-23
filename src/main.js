// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import fastclick from 'fastclick'

import { checkOpenid } from "api/interface";

import 'style/reset.css'
import 'api/set_up_rem.js'

axios.defaults.timeout = 10000;

Vue.prototype.$Axios = axios

Vue.config.productionTip = false

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
});

checkOpenid().then(res => {
    let openId = "";
    if (res.success == 1) {
        openId = res.data || "";
    }

    (function(g, d, s, t) {
        g['_cts'] = g['_cts'] || {};
        g['_cts'][t] = g['_cts'][t] || {};
        g[t] = g[t] || function() {
            (g[t].c = g[t].c || []).push(arguments);
        }

        var c = d.createElement(s),
            h = d.getElementsByTagName(s)[0];
        c.src = '//c.baidu.com/dmp/t.js';
        h.parentNode.insertBefore(c, h);
    })(window, document, 'script', 'pilot');
    pilot('set', 'siteId', 'CCS81202');
    pilot('set', 'accountId', 'pilot');
    pilot('set', 'baseUrl', 'https://trk.baidu.com/');
    pilot('set', 'user', 'openid', openId);
    pilot('track', 'pageview');
});