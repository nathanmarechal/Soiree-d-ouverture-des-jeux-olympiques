import AdminEditUsers from '../views/AdminEditUsers.vue'
import AdminEditRoles from '../views/AdminEditRoles.vue'
import AdminMapPage from '../views/AdminMapPage.vue'
import AdminZonePage from '../views/AdminZonePage.vue'

const adminRoutes = [
    {
        path: '/users',
        name: 'AdminEditUsers',
        component: AdminEditUsers
    },
    {
        path: '/roles', 
        name: 'AdminEditRoles',
        component: AdminEditRoles
    },
    {
        path: '/areas',
        name: 'AdminMapView',
        component: AdminMapPage
    },
    {
        path: '/zones',
        name: 'AdminZoneView',
        component: AdminZonePage
    }
]

export default adminRoutes;
