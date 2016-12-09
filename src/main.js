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
            { path: '/costanalyse', component: Costanalyse, name: '业务报价' },
            { path: '/costmonthly', component: Costmonthly, name: '成本月报' },
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
        historyprice: ''

    },
    mutations: {
        changehistoryprice(state, data) {
            state.historyprice = data
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