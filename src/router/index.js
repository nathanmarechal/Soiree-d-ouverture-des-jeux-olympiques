import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminEditUsers from '../views/AdminEditUsers.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/AdminEditUsers',
    name: 'AdminEditUsers',
    component: AdminEditUsers
  },
  {
    path: '/',
    name: 'HOME',
    component: () => import('../App.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
