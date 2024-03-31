import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import WalletListView from '../views/WalletListView.vue'
import CreateWalletView from '../views/CreateWalletView.vue'

/*
 - Start: LoginVue
 - Only dynamic roots are authorized
 - If account => Summary View
 - If no account => Create Account View
 - Once an account is created => Summary View
*/
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/walletlist',
    name: 'walletlist',
    component: WalletListView
  },
  {
    path: '/createwallet',
    name: 'createwallet',
    component: CreateWalletView
  },
  {
    path: '/account/dashboard',
    name: 'dashboard',
    beforeEnter: (to, from) => {
      // reject the navigation
      return true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/AccountSummaryView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
