import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/HomePage.vue';
import Information from '../views/InformationPage.vue';
import Shop from '../views/ShopPage.vue';
import MapPage from "@/views/mapPage.vue";
import StandPage from "../views/standPage.vue";
import SignUpPage from "../views/SignUpPage.vue";
import NotFound from "../views/Error404Page.vue";
import AdminEditUsers from '../views/AdminEditUsers.vue';
import AdminEditRoles from '../views/AdminEditRoles.vue';
import AdminMapPage from '../views/AdminMapPage.vue';
import AdminZonePage from '../views/AdminZonePage.vue';

Vue.use(VueRouter);

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
    path: '/shop',
    name: 'ShopView',
    component: Shop
  },
  {
    path: '/map',
    name: 'MapView',
    component: MapPage
  },
  {
    path: '/stand',
    name: 'StandView',
    component: StandPage
  },
  {
    path: '/sign-up',
    name: 'SignUpView',
    component: SignUpPage
  },
  // Routes d'administration
  {
    path: '/admin/users',
    name: 'AdminEditUsers',
    component: AdminEditUsers
  },
  {
    path: '/admin/roles',
    name: 'AdminEditRoles',
    component: AdminEditRoles
  },
  {
    path: '/admin/areas',
    name: 'AdminMapView',
    component: AdminMapPage
  },
  {
    path: '/admin/zones',
    name: 'AdminZoneView',
    component: AdminZonePage
  },
  // Gestion des routes non trouvées
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
