import AdminEditUsers from '../views/Admin/User/AdminEditUsers.vue'
import AdminRoles from '../views/Admin/Role/AdminRoles.vue'

import AdminMapPage from '../views/Admin/Emplacement/AdminMapPage.vue'
import AdminZonePage from '../views/Admin/Zone/AdminZonePage.vue'

const adminRoutes = [
    {
        path: '/users',
        name: 'AdminEditUsers',
        component: AdminEditUsers
    },
    {
        path: '/roles', 
        name: 'AdminRoles',
        component: AdminRoles
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
