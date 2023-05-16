import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // 登录
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/auth/Login'),
    meta: { title: '登录' }
  },
  // 个人中心
  {
    name: 'user',
    path: '/:accountName',
    component: () => import('@/views/user/User'),
    meta: { title: '个人中心' }
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/auth/Register'),
    meta: { title: '注册' }
  },
  // 仓库详情
  {
    name: 'repo-detail',
    path: '/:accountName/:repoName/tree/:branchName',
    component: () => import("@/views/repo/RepoDetail"),
    meta: { title: "仓库详情" },
  },
  // 目录详情
  {
    name: 'tree-detail',
    path: '/:accountName/:repoName/tree/:branchName/:treeName',
    component: () => import("@/views/repo/TreeDetail"),
    meta: { title: "目录详情" },
  },
  // 文件详情
  {
    name: 'blob-detail',
    path: '/:accountName/:repoName/blob/:branchName/:treeName/:blobName',
    component: () => import("@/views/repo/BlobDetail"),
    meta: { title: "文件详情" },
  },
  // 操作界面
  {
    name: 'operation',
    path: '/:accountName/:repoName/do/:branchName',
    component: () => import("@/views/repo/Operation"),
    meta: { title: "操作" },
  },
  // commits
  {
    name: 'commits',
    path: '/:accountName/:repoName/:branchName/commits',
    component: () => import("@/views/repo/Commits"),
    meta: { title: "Commits" },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404'),
    meta: { title: '404-NotFound' }
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
]

const router = new VueRouter({
  routes
})

export default router
