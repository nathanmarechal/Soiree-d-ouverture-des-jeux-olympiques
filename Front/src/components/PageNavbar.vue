<template>
  <div>
    <b-navbar toggleable="md" class="desktop-navbar" style="display: flex; align-items: center; justify-content: space-between;">
      <router-link to="/"><b-navbar-brand ><img :src="require('@/assets/paris_2024_logo.svg')" alt="Logo" class="navbar-logo"></b-navbar-brand></router-link>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/information" @mouseover="underline = 'Informations'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Informations' }">{{translate("informations")}}</router-link>
          </b-nav-item>
          <b-nav-item to="/map" href="#" @mouseover="underline = 'Carte'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Carte' }">{{translate("carte")}}</b-nav-item>
          <b-nav-item :to="{ name: 'shopView'}" @click="fromNav()" href="#" @mouseover="underline = 'hop'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Shop' }">{{translate("magasin")}}</b-nav-item>

          <b-nav-item v-if="this.checkIfUserHasRight('messages_admin')" to="/messages-admin" href="#" @mouseover="underline = 'Messagerie'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Messagerie' }">{{translate("messagerie")}}</b-nav-item>

          <b-nav-item v-if="this.checkIfUserHasRight('messages_user')" to="/messages-user" href="#" @mouseover="underline = 'Messagerie'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Messagerie' }">{{translate("messagerie")}}</b-nav-item>

          <b-nav-item-dropdown v-if="this.checkIfUserHasRight('create_self_prestations') || this.checkIfUserHasRight('update_self_prestations') ||  this.checkIfUserHasRight('delete_self_prestations') || this.checkIfUserHasRight('update_self_stands') || this.checkIfUserHasRight('statistiques_prestataire') || this.checkIfUserHasRight('see_self_commande_received') || this.checkIfUserHasRight('create_self_prestations') || this.checkIfUserHasRight('update_self_prestations') ||  this.checkIfUserHasRight('delete_self_prestations') || this.checkIfUserHasRight('see_users') || this.checkIfUserHasRight('see_waiting_users') || this.checkIfUserHasRight('create_stands') || this.checkIfUserHasRight('update_stands') || this.checkIfUserHasRight('delete_stands') || this.checkIfUserHasRight('create_areas') || this.checkIfUserHasRight('update_areas') || this.checkIfUserHasRight('delete_areas') || this.checkIfUserHasRight('create_zones') || this.checkIfUserHasRight('update_zones') || this.checkIfUserHasRight('delete_zones') || this.checkIfUserHasRight('create_roles') || this.checkIfUserHasRight('update_roles') || this.checkIfUserHasRight('delete_roles') || this.checkIfUserHasRight('statistiques_admin')" right text="Mes Services" @mouseover="underline = 'Administration'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Administration' }">

            <div v-if="this.checkIfUserHasRight('create_self_prestations') || this.checkIfUserHasRight('update_self_prestations') ||  this.checkIfUserHasRight('delete_self_prestations')">
              <router-link to="/prestataire/prestations" class = "dp">{{ translate("prestations") }}</router-link>
            </div>

            <div v-if="this.checkIfUserHasRight('update_self_stands')">

            <router-link to="/prestataire/stand" class = "dp">{{translate("monStand")}}</router-link>
            </div>


            <div v-if="this.checkIfUserHasRight('statistiques_prestataire')">
              <router-link to="/prestataire/statistiques" class = "dp">{{translate("mesStatistiques")}}</router-link>
            </div>
            
            <div v-if="this.checkIfUserHasRight('see_self_commande_received') ">

            <router-link to="/prestataire/commandes" class = "dp">{{translate("commandes")}}</router-link>

            </div>

            <div v-if="this.checkIfUserHasRight('create_self_prestations') || this.checkIfUserHasRight('update_self_prestations') ||  this.checkIfUserHasRight('delete_self_prestations')">
              <router-link to="/prestataire/avis" class = "dp"> {{translate("avis")}}</router-link>
            </div>

            <div v-if="this.checkIfUserHasRight('see_users')">
              <router-link  to="/admin/users" class = "dp">{{translate("comptes")}} </router-link>
            </div>

            <div v-if="this.checkIfUserHasRight('see_waiting_users')">
              <router-link  to="/admin/userWaiting" class = "dp">{{ translate("inscriptions") }}</router-link>
            </div>

            <div v-if="this.checkIfUserHasRight('create_stands')
            || this.checkIfUserHasRight('update_stands')
            || this.checkIfUserHasRight('delete_stands')">
              <router-link  to="/admin/stands" class = "dp">{{translate("stands")}}</router-link>
            </div>

            <div v-if="this.checkIfUserHasRight('create_areas')
            || this.checkIfUserHasRight('update_areas')
            || this.checkIfUserHasRight('delete_areas')">
              <router-link  to="/admin/areas" class = "dp">{{translate("emplacements")}}</router-link>
            </div>

            <div v-if="this.checkIfUserHasRight('create_zones')
            || this.checkIfUserHasRight('update_zones')
            || this.checkIfUserHasRight('delete_zones')">
              <router-link  to="/admin/zones" class = "dp">{{translate("zones")}}</router-link>
            </div>
            <div v-if="this.checkIfUserHasRight('create_roles')
            || this.checkIfUserHasRight('update_roles')
            || this.checkIfUserHasRight('delete_roles')">
              <router-link  to="/admin/roles" class = "dp">{{translate("roles")}}</router-link>
            </div>
            <div v-if="this.checkIfUserHasRight('statistiques_admin')">
              <router-link to="/admin/statistiques" class = "dp">{{translate("statistiques")}}</router-link>
            </div>
          </b-nav-item-dropdown>

        </b-navbar-nav>

      </b-collapse>

      <div style="display: contents;">
      <b-navbar-brand v-if="!isUserConnected" href="#" @click="showLoginModal" > <img src="../assets/Logos/login-18.svg" alt="Logo login" class="navbar-svg-login"></b-navbar-brand>
      <b-nav-item-dropdown v-if="isUserConnected" style="color: grey" :text="currentUser.email">
        <b-dropdown-item><router-link to="/panier" class = "dp">{{translate("monPanier")}}</router-link></b-dropdown-item>
        <b-dropdown-item ><router-link to="/commande" class = "dp">{{translate("mesCommandes")}}</router-link></b-dropdown-item>
        <b-dropdown-item ><router-link to="/userinfo" class = "dp">{{translate("mesInformations")}}</router-link></b-dropdown-item>
        <b-dropdown-item ><router-link to="/schedule" class = "dp">{{translate("monEmploiDuTemps")}}</router-link></b-dropdown-item>
        <b-dropdown-item v-if="isUserConnected" @click="disconnect" href="/" class = "dp">{{translate("seDeconnecter")}}</b-dropdown-item>
      </b-nav-item-dropdown>

        <b-nav-text style="font-weight: bold; color: red;">{{ this.getRoleCurrentUserLabel() }}</b-nav-text>

        <select v-model="selectedLanguage" id="selectedLanguage" @change="changeLanguage(selectedLanguage)">
        <option value="fr">Français</option>
        <option value="en">English</option>
        <option value="jp">日本語</option>
        <option value="es">Español</option>
        <option value="kr">한국인</option>
      </select>
      </div>
    </b-navbar>
    <b-button v-if="!isSidebarOpen" v-b-toggle.mobile-nav class="mobile-navbar-btn d-md-none">☰</b-button>
    <div id="loginModal" title="Login" class="centered hide-footer">
      <login-component :isLoginOpen="isLoginOpen" @closeModal="isLoginOpen = false"></login-component> <!-- pour refiler le booléen à l'enfant -->
    </div>
  </div>


</template>

<script>
import {logout} from "@/services/login.service";
import LoginComponent from './LoginComponent.vue';
import {changeLanguage, translate} from "@/lang/translationService.js";
import {mapActions, mapGetters, mapState, mapMutations} from "vuex";

export default {
  data() {
    return {
      underline: null,
      isSidebarOpen: false,
      translations:[],
      selectedLanguage:"fr"
    };
  },
  computed: {
    ...mapState('user',['userCourant']),
    ...mapGetters('roleEtDroit',['getAllRoles']),
    isLoginOpen() {
      return this.$store.getters['user/isLoginOpen'];
    },
    isUserConnected() {
      return this.$store.getters['user/isUserConnected'];
    },
    currentUser() {
      return this.$store.getters['user/getCurrentUser'];
    },

    ...mapGetters('user',['checkIfUserHasRight'])
  },
  components: {
    'login-component': LoginComponent
  },
  methods: {
    ...mapActions('roleEtDroit',['getRolesStore']),
    ...mapMutations('user',['SET_CURRENT_USER',
    'SET_PANIER_USER_COURANT',
    'SET_COMMANDES_USER_COURANT',
    'SET_SCHEDULE',
    'SET_DROITS_USER_COURANT',
    'SET_IS_USER_CONNECTED',
    'SET_LOGIN_MODAL',
    'SET_PROVENANCE',
    'SET_SELECTED_STANDS',
    'SET_SELECTED_TYPE_PRESTATION']),
    translate,
    changeLanguage,

    async loadData() {
      if (this.getAllRoles.length === 0) {
        await this.getRolesStore();
      }
    },

    async kaks(right) {
      // Utilisez la méthode mappée, attendez le résultat même si l'action est synchrone
      return await this.checkIfUserHasRight(right);
    },

    getRoleCurrentUserLabel() {
      // Utiliser `this.userCourant.id_role` pour obtenir l'id_role de l'utilisateur courant
      // et `this.getAllRoles` pour accéder au tableau des rôles disponibles
      const role = this.getAllRoles.find(role => role.id_role === this.userCourant.id_role);

      // Retourner le libellé du rôle si trouvé, sinon retourner une valeur par défaut ou null
      return role ? role.libelle : 'Rôle non défini'; // Vous pouvez choisir une valeur par défaut appropriée
    },

    fromNav() {
      this.$store.commit('user/SET_PROVENANCE', -1);
      this.$store.commit('stands/SET_SELECTED_STANDS', []);
      this.$store.commit('prestationEtType/SET_SELECTED_TYPE_PRESTATION', []);
    },
    showLoginModal() {
      this.$store.commit('user/SET_LOGIN_MODAL', true);
    },


  async disconnect() {
  /*
  this.$store.commit('user/SET_CURRENT_USER', null);
  this.$store.commit('user/SET_PANIER_USER_COURANT', null);
  this.$store.commit('user/SET_COMMANDES_USER_COURANT', null);
  this.$store.commit('user/SET_SCHEDULE', null);
  this.$store.commit('user/SET_DROITS_USER_COURANT', null);
  this.$store.commit('user/SET_IS_USER_CONNECTED', false);
  */
  console.log('disconnect');
  await logout();
  this.SET_CURRENT_USER(null);
  this.SET_PANIER_USER_COURANT(null);
  this.SET_COMMANDES_USER_COURANT(null);
  this.SET_SCHEDULE(null);
  this.SET_DROITS_USER_COURANT(null);
  this.SET_IS_USER_CONNECTED(false);
  console.log('disconnect');
  await logout();
  },

  },

  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

body, .b-navbar {
  font-family: 'Open Sans', sans-serif;
}

.navbar-svg-login {
  height: 40px;
  margin-left: auto;
}



.desktop-navbar .navbar-nav .nav-link {
  font-size: 18px;
  margin-right: 10vh;
  color: #D8C17B;
}

.desktop-navbar .navbar-nav .nav-link:hover {
  color: brown;
}

.desktop-navbar .navbar-nav .nav-link a {
  color: inherit;
  text-decoration: none;
}

.desktop-navbar .navbar-nav .nav-link a:hover {
  color: inherit;
  text-decoration: none;
}

.desktop-navbar .navbar-nav .b-nav-item-dropdown > .nav-link {
  color: gold;
}

.desktop-navbar .navbar-nav .b-nav-item-dropdown .dropdown-menu .dropdown-item:hover {
  color: black !important;
}


.mobile-navbar-btn {
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 998;
}

.b-navbar.desktop-navbar .navbar-nav .b-nav-item-dropdown > .nav-link {
  color: gold;
}

.close-button {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}

.underline {
  text-decoration: underline;
}

.navbar-logo {
  height: 70px;
  margin-right: 10vh;
  margin-left: 5vh;
}

@media (max-width: 767px) {
  .desktop-navbar .navbar-svg-login {
    display: none;
  }
}

@media (min-width: 768px) {
  .desktop-navbar {
    display: block;
  }
  .mobile-navbar-btn {
    display: none;
  }
  .desktop-navbar .navbar-svg-login {
    display: block;
  }
  .b-sidebar .navbar-svg-login {
    display: none;
  }
}
</style>
