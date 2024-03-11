import Home from '@/views/HomePage.vue';
import Information from '@/views/InformationPage.vue';
import Shop from '@/views/ShopPage.vue';
import MapPage from "@/views/mapPage.vue";
import StandPage from "@/views/standPage.vue";
import SignUpPage from "@/views/SignUpPage.vue";
import NotFound from "@/views/Error404Page.vue";
import PanierPage from "@/views/PanierPage.vue";
import CommandePage from "@/views/CommandePage.vue";
import CommandeDetailClientVue from '@/components/commandeClient/detailleCommandeClient.vue'
import UserInfo from '@/views/UserInfoView.vue'
import ValidLignePage from "@/views/ValidLignePage.vue";
import edtPage from "@/views/EdtPage.vue";
import MessagerieAdmin from "@/views/Messagerie/MessagerieAdmin.vue";
import MessagerieConversationAdmin from "@/views/Messagerie/MessagerieConversationAdmin.vue";
import MessagerieUser from "@/views/Messagerie/MessagerieUser.vue";
import MessagerieConversationUser from "@/views/Messagerie/MessagerieConversationUser.vue";


export const mainRoutes = [
  {
    path: '/',
    name: 'homeView',
    component: Home
  },
  {
    path: '/userinfo',
    name: 'userInfo',
    component: UserInfo
  },
  {
    path: '/information',
    name: 'InformationView',
    component: Information
  },
  {
    path: '/panier',
    name: 'panierView',
    component: PanierPage
  },
  {
    path: '/schedule',
    name: 'ScheduleView',
    component: edtPage
  },
  {
    path: '/detail-commande/:id',
    name: 'DetailCommande',
    component: CommandeDetailClientVue
  },
  {
    path: '/validLigneCommande/:id_prestation/:id_creneau/:id_commande',
    name: 'validLigneCommande',
    component: ValidLignePage
  },
  {
    path: '/commande', 
    name: 'CommandeView',
    component: CommandePage
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
  {
    path: '/messages-admin',
    name: 'MessagesAdmin',
    component: MessagerieAdmin,
    meta: { rightToAccess: "messages_admin"}
  },
  {
    path: '/messages-admin-conversation',
    name: 'MessagesAdminConversation',
    component: MessagerieConversationAdmin,
    meta: { rightToAccess: "messages_admin"}
  },
  {
    path: '/messages-user',
    name: 'MessagesUser',
    component: MessagerieUser,
    meta: { rightToAccess: "messages_user"}

  },
  {
    path: '/messages-user-conversation',
    name: 'MessagesConversationUser',
    component: MessagerieConversationUser,
    meta: { rightToAccess: "messages_user"}
  },
    //Error 404
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
];
