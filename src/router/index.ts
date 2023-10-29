import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/account',
    name: 'account',
    beforeEnter: (to, from) => {
      // reject the navigation
      return true
    },
    component: () => import(/* webpackChunkName: "account" */ '../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    beforeEnter: (to, from) => {
      // reject the navigation
      return true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },  
  {
    path: '/create-account',
    name: 'create-account',
    beforeEnter: (to, from) => {
      // reject the navigation
      return true
    },
    component: () => import(/* webpackChunkName: "CreateAccount" */ '../views/CreateAccountView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
