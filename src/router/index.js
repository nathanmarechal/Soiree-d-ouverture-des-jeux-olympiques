import Vue from 'vue'
import Home from '../views/HomePage.vue'
import Information from '../views/InformationPage.vue'
import Shop from '../views/ShopPage.vue'
import VueRouter from 'vue-router'
import AdminEditUsers from '../views/AdminEditUsers.vue'
import mapPage from "@/views/mapPage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homeView',
    component: Home
  },
  {
    path: '/information',
    name: 'InformationView',
    component: Information
  },
  {
    path: '/AdminEditUsers',
    name: 'AdminEditUsers',
    component: AdminEditUsers
  },
  {
    path: '/shop',
    name: 'shopView',
    component: Shop
  },
  {
    path: '/map',
    name: 'MapView',
    component: mapPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
