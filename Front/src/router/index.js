import Vue from 'vue'
import Home from '../views/HomePage.vue'
import Information from '../views/InformationPage.vue'
import Shop from '../views/ShopPage.vue'
import VueRouter from 'vue-router'
import AdminEditUsers from '../views/AdminEditUsers.vue'
import mapPage from "@/views/mapPage.vue";
import standPage from "../views/standPage.vue"
import signUpPage from "../views/SignUpPage.vue"
import AdminEditRoles from '@/views/AdminEditRoles.vue'
import AdminMapPage from '../views/AdminMapPage.vue'

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
    path: '/AdminEditRoles',
    name: 'AdminEditRoles',
    component: AdminEditRoles
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
  },
  {
    path: '/stand',
    name: 'StandView',
    component: standPage
  },
  {
    path: '/sign-up',
    name: 'signUpView',
    component: signUpPage
  },
  {
    path: '/edit-area',
    name: 'AdminMapView',
    component: AdminMapPage
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
