import Vue from 'vue'
import Home from '../Views/HomePage.vue'
import Information from '../Views/InformationPage.vue'
import VueRouter from 'vue-router'


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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
