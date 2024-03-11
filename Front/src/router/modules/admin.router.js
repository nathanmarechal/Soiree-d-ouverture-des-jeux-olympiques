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
        { path: 'users', name: 'AdminUsers', component: AdminUsers },
        { path: 'users/add', name: 'AdminAddUser', component: AdminAddUser },
        { path: 'users/edit', name: 'AdminEditUsers', component: AdminEditUsers },
        { path: 'stands', name: 'AdminStand', component: AdminStand },
        { path: 'stand/add', name: 'AdminAddStand', component: AdminAddStand },
        { path: 'stand/edit', name: 'AdminEditStand', component: AdminEditStand },
        { path: 'roles', name: 'AdminRoles', component: AdminRoles },
        { path: 'roles/add', name: 'AdminAddRoles', component: AdminAddRoles },
        { path: 'roles/edit', name: 'AdminEditRoles', component: AdminEditRoles },
        { path: 'deleteCascadeProtector', name: 'AdminDeleteCascadeProtector', component: AdminDeleteCascadeProtector },
        { path: 'areas', name: 'AdminMapView', component: AdminMapPage },
        { path: 'zones', name: 'AdminZoneView', component: AdminZonePage },
        { path: 'zones/edit/', name: 'AdminEditZoneView', component: AdminEditZonePage },
        { path: 'zones/add', name: 'AdminAddZoneView', component: AdminAddZonePage },
        { path: 'statistiques', name: 'AdminStatistiqueView', component: AdminStatistiquePage },
        { path: 'userWaiting', name: 'UserWaitingView', component: waitingUsersPage },
    ]
    }
];
