import Admin from '@/views/Admin/Admin.vue'; // Assurez-vous d'avoir une Vue racine pour Admin
import AdminUsers from '@/views/Admin/User/AdminUsers.vue';
import AdminAddUser from '@/views/Admin/User/AdminAddUser.vue';
import AdminEditUsers from '@/views/Admin/User/AdminEditUsers.vue';
import AdminStand from '@/views/Admin/Stand/AdminStand.vue';
import AdminAddStand from '@/views/Admin/Stand/AdminAddStand.vue';
import AdminEditStand from '@/views/Admin/Stand/AdminEditStand.vue';
import AdminRoles from '@/views/Admin/Role/AdminRoles.vue';
import AdminAddRoles from '@/views/Admin/Role/AdminAddRoles.vue';
import AdminEditRoles from '@/views/Admin/Role/AdminEditRoles.vue';
import AdminMapPage from '@/views/Admin/Emplacement/AdminMapPage.vue';
import AdminZonePage from '@/views/Admin/Zone/AdminZonePage.vue';
import AdminEditZonePage from '@/views/Admin/Zone/AdminEditZonePage.vue';
import AdminAddZonePage from '@/views/Admin/Zone/AdminAddZonePage.vue';
import AdminStatistiquePage from '@/views/Admin/Statistique/AdminStatistiquePage.vue';
import AdminDeleteCascadeProtector from "@/views/Admin/DeleteCascadeProtectorPage.vue";
import waitingUsersPage from "@/views/WaitingUsersPage.vue";
export const adminRoutes = [
    {
    path: '/admin',
    component: Admin,
    children: [
        { path: 'users', name: 'AdminUsers', component: AdminUsers, meta: { rightToAccess: "see_users"}},
        { path: 'users/add', name: 'AdminAddUser', component: AdminAddUser , meta: { rightToAccess: "create_users"}},
        { path: 'users/edit', name: 'AdminEditUsers', component: AdminEditUsers, meta: { rightToAccess: "update_users"} },
        { path: 'stands', name: 'AdminStand', component: AdminStand },
        { path: 'stand/add', name: 'AdminAddStand', component: AdminAddStand , meta: { rightToAccess: "create_stands"} },
        { path: 'stand/edit', name: 'AdminEditStand', component: AdminEditStand , meta: { rightToAccess: "update_stands"}},
        { path: 'roles', name: 'AdminRoles', component: AdminRoles },
        { path: 'roles/add', name: 'AdminAddRoles', component: AdminAddRoles , meta: { rightToAccess: "create_roles"}},
        { path: 'roles/edit', name: 'AdminEditRoles', component: AdminEditRoles, meta: { rightToAccess: "update_roles"} },
        { path: 'deleteCascadeProtector', name: 'AdminDeleteCascadeProtector', component: AdminDeleteCascadeProtector },
        { path: 'areas', name: 'AdminMapView', component: AdminMapPage },
        { path: 'zones', name: 'AdminZoneView', component: AdminZonePage },
        { path: 'zones/edit/', name: 'AdminEditZoneView', component: AdminEditZonePage , meta: { rightToAccess: "update_zones" }},
        { path: 'zones/add', name: 'AdminAddZoneView', component: AdminAddZonePage , meta: { rightToAccess: "create_zones" } },
        { path: 'statistiques', name: 'AdminStatistiqueView', component: AdminStatistiquePage  , meta: { rightToAccess: "statistiques_admin" }},
        { path: 'userWaiting', name: 'UserWaitingView', component: waitingUsersPage, meta: { rightToAccess: "accept_waiting_users" } },
    ]
    }
];
