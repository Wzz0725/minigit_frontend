import router from './router'
import store from './store'
import getPageTitle from '@/utils/get-page-title'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import {getAccountName} from "@/utils/auth"; // progress bar style

NProgress.configure({showSpinner: false}) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()
    // set page title
    document.title = getPageTitle(to.meta.title)
    // determine whether the user has logged in
    const hasAcountName = getAccountName();

    if (hasAcountName) {
        if (to.path === '/login') {
            // 登录，跳转首页
            next({path: '/'})
            NProgress.done()
        } else {
            // 获取用户信息
            await store.dispatch('user/getInfo')
            next()
        }
    } else {
        next()
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})