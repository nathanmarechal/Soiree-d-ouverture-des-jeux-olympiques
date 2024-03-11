import Vue from 'vue';
import VueRouter from 'vue-router';
import { mainRoutes } from '@/router/modules/main.router';
import { adminRoutes } from '@/router/modules/admin.router';
import { prestataireRoutes } from '@/router/modules/prestataire.router';

Vue.use(VueRouter);

const routes = [...mainRoutes, ...adminRoutes, ...prestataireRoutes];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
