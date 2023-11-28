import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/HomePage.vue';
import Information from '../views/InformationPage.vue';
import Shop from '../views/ShopPage.vue';
import MapPage from "@/views/mapPage.vue";
import StandPage from "../views/standPage.vue";
import SignUpPage from "../views/SignUpPage.vue";
import NotFound from "../views/Error404Page.vue";
import AdminEditUsers from '../views/Admin/User/AdminEditUsers.vue';
import AdminEditRoles from '../views/Admin/Role/AdminEditRoles.vue';
import AdminMapPage from '../views/Admin/Emplacement/AdminMapPage.vue';
import AdminZonePage from '../views/Admin/Zone/AdminZonePage.vue';
import AdminEditZonePage from '@/views/Admin/Zone/AdminEditZonePage.vue'
import AdminAddZonePage from '@/views/Admin/Zone/AdminAddZonePage.vue'
import PrestatairePrestationShowPage from '@/views/Prestataire/Prestation/ShowPrestationPrestatairePage.vue'
import PrestatairePrestationAddPage from '@/views/Prestataire/Prestation/AddPrestatairePrestation.vue'

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
    name: 'shopView',
    path: '/shop',
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

  {
    path: '/admin/zones/edit/:id_zone',
    name: 'AdminEditZoneView',
    component: AdminEditZonePage
  },
  {
    path: '/admin/zones/add',
    name: 'AdminAddZoneView',
    component: AdminAddZonePage
  },
  {
    path: '/prestataire/prestations',
    name: 'PrestatairePrestationShowView',
    component: PrestatairePrestationShowPage
  },
  {
    path: '/prestataire/prestations/add',
    name: 'PrestatairePrestationAddView',
    component: PrestatairePrestationAddPage
  },
    //Error 404
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
