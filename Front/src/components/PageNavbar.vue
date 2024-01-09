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

          <div v-if="isUserPrestataire">
            <b-nav-item-dropdown name="prestataire" right text="Prestataire" @mouseover="underline = 'Prestataire'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Prestataire' }">
              <router-link to="/prestataire/prestations" class = "dp">{{ translate("prestations") }}</router-link>
              <br>
              <router-link to="/prestataire/stand" class = "dp">{{translate("monStand")}}</router-link>
              <br>
              <router-link to="/prestataire/statistiques" class = "dp">{{translate("mesStatistiques")}}</router-link>
              <br>
              <router-link to="/prestataire/commandes" class = "dp">{{translate("commandes")}}</router-link>
              <br>
              <router-link to="/prestataire/avis" class = "dp"> {{translate("avis")}}</router-link>
            </b-nav-item-dropdown>
          </div>

          <b-nav-item-dropdown v-if="isUserAdmin" right text="Administration" @mouseover="underline = 'Administration'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Administration' }">
            <router-link to="/admin/users" class = "dp">{{translate("comptes")}} </router-link>
            <br>
            <router-link to="/admin/userWaiting" class = "dp">{{ translate("inscriptions") }}</router-link>
            <br>
            <router-link to="/admin/stands" class = "dp">{{translate("stands")}}</router-link>
            <br>
            <router-link to="/admin/areas" class = "dp">{{translate("emplacements")}}</router-link>
            <br>
            <router-link to="/admin/zones" class = "dp">{{translate("zones")}}</router-link>
            <br>
            <router-link to="/admin/roles" class = "dp">{{translate("roles")}}</router-link>
            <br>
            <router-link to="/admin/statistiques" class = "dp">{{translate("statistiques")}}</router-link>
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
      <img v-if="isUserAdmin" src="@/assets/Logos/isAdminIcon.png" alt="admin" style="width: 25px;">
      <img v-if="isUserPrestataire" src="@/assets/Logos/isPrestataireIcon.png" alt="prestataire" style="width: 25px;">


      <select v-model="selectedLanguage" id="selectedLanguage" @change="changeLanguage(selectedLanguage)">
        <option value="fr">Français</option>
        <option value="en">English</option>
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
import LoginComponent from './LoginComponent.vue';
import {changeLanguage, translate} from "@/lang/translationService.js";

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
    isLoginOpen() {
      return this.$store.getters.isLoginOpen;
    },
    isUserConnected() {
      return this.$store.getters.isUserConnected;
    },
    isUserAdmin() {
      const val = this.$store.getters.isUserConnected
          && this.$store.getters.getCurrentUser.id_role===1;
      return val;
    },
      isUserPrestataire() {
      const val = this.$store.getters.isUserConnected
          && this.$store.getters.getCurrentUser.id_role===2;
      return val;
    },
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
  components: {
    'login-component': LoginComponent
  },
  methods: {
    translate,
    changeLanguage,


    fromNav() {
      this.$store.commit('SET_PROVENANCE', -1);
      this.$store.commit('SET_SELECTED_STANDS', []);
      this.$store.commit('SET_SELECTED_TYPE_PRESTATION', []);
    },
    showLoginModal() {
      this.$store.commit('SET_LOGIN_MODAL', true);
    },
    disconnect() {
      this.$store.commit('SET_IS_USER_CONNECTED', false);
      this.$store.commit('SET_CURRENT_USER', null);
      //this.$store.commit('SET_EMAIL', '');
      //this.$store.commit('SET_PASSWORD', '');
    },
  },
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
