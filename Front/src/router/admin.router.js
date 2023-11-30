import AdminEditUsers from '../views/Admin/User/AdminEditUsers.vue'
import AdminEditRoles from '../views/Admin/Role/AdminEditRoles.vue'

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
