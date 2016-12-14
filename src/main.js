import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueRouter from 'vue-router'
import $ from 'jquery'
Vue.use(Vuex)
Vue.use(VueRouter)


import Login from './components/Login'
import Wrapper from './components/Wrapper'
import Costanalyse from './components/Costanalyse'
import Costmonthly from './components/Costmonthly'
import Materialprice from './components/Materialprice'
import Huilv_linechart from './components/Huilv_linechart'
/* eslint-disable no-new */
const router = new VueRouter({
    routes: [{
        path: '/',
        component: Login
    }, {
        path: '/wrapper',
        name: '',
        component: Wrapper,
        children: [
            { path: '/costanalyse', component: Costanalyse, name: '成本查看' },
            { path: '/materialprice', component: Materialprice, name: '材料价格' },
            { path: '/costmonthly', component: Costmonthly, name: '成本月报' },
            { path: '/huilv', component: Huilv_linechart, name: '汇率' }
        ]
    }]
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    NProgress.set(0.4)
    setTimeout(() => {
        next()
    }, 300)
})
router.afterEach((transition) => {
    NProgress.done()
})
const store = new Vuex.Store({
    state: {
        cny: false,
        usd: false

    },
    mutations: {
        changehistoryprice(state, data) {
            state.historyprice = data
        },
        showcny(state) {
            state.cny = true
        },
        hidecny(state) {
            state.cny = false
        },
        showusd(state) {
            state.usd = true
        },
        hideusd(state) {
            state.usd = false
        }
    }
})
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})