import Vue from 'vue';
import VueRouter from 'vue-router';
import { mainRoutes } from '@/router/modules/main.router';
import { adminRoutes } from '@/router/modules/admin.router';
import { prestataireRoutes } from '@/router/modules/prestataire.router';
import store from "@/store";
Vue.use(VueRouter);

const routes = [...mainRoutes, ...adminRoutes, ...prestataireRoutes];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

// Middleware pour vérifier l'accès avant chaque route
router.beforeEach(async (to, from, next) => {
    const requiresRights = to.meta.rightToAccess;

    if (requiresRights) {
        // Utilisation de dispatch pour appeler l'action asynchrone checkIfUserHasRight
        const hasRight = await store.dispatch('user/checkIfUserHasRight', requiresRights);
        if (!hasRight) {
            console.log("Accès refusé. Redirection vers la page de connexion.");
            return next('/'); // Rediriger vers la page de connexion ou toute autre page appropriée
        }
    }

    // Si aucun droit spécifique n'est requis ou si l'utilisateur a le droit nécessaire, continuer vers la route demandée
    next();
});

export default router;
