<template>
  <div>
    <b-navbar toggleable="md" class="desktop-navbar">
      <router-link to="/"><b-navbar-brand ><img src="https://www.paris2024.org/app/themes/2024-reveal/dist/svgs/emblem/emblem-color_6eaa96d6.svg" alt="Logo" class="navbar-logo"></b-navbar-brand></router-link>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/information" @mouseover="underline = 'Informations'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Informations' }">{{translate("informations")}}</router-link>
          </b-nav-item>
          <b-nav-item to="/map" href="#" @mouseover="underline = 'Carte'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Carte' }">{{translate("carte")}}</b-nav-item>
          <b-nav-item :to="{ name: 'shopView'}" @click="fromNav()" href="#" @mouseover="underline = 'hop'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Shop' }">{{translate("magasin")}}</b-nav-item>

          <b-nav-item-dropdown right text="Stands" @mouseover="underline = 'Stands'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Stands' }">
            <b-dropdown-item href="#" class = "dp"><router-link to="/Shop" @mouseover="underline = 'Informations'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Informations' }">{{translate("nourriture")}}</router-link></b-dropdown-item>
            <b-dropdown-item href="#" class = "dp">{{translate("boisson")}}</b-dropdown-item>
            <b-dropdown-item href="#" class = "dp">{{translate("fanzone")}}</b-dropdown-item>
            <b-dropdown-item href="#" class = "dp">{{translate("billetterie")}}</b-dropdown-item>
            <b-dropdown-item href="#" class = "dp">{{translate("magasin")}}</b-dropdown-item>
            <b-dropdown-item href="#" class = "dp">{{translate("activites")}}</b-dropdown-item>
            <b-dropdown-item href="#" class = "dp">{{translate("decouverteInternationale")}}</b-dropdown-item>
            <b-dropdown-item href="#" class = "dp">{{translate("RATP")}}</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown v-if="isUserPrestataire" right text="Prestataire" @mouseover="underline = 'Prestataire'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Prestataire' }">
            <router-link to="/prestataire/prestations" class = "dp">{{ translate("prestations") }}</router-link>
            <br>
            <router-link to="/prestataire/stand" class = "dp">{{translate("monStand")}}</router-link>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown v-if="isUserAdmin" right text="Administration" @mouseover="underline = 'Administration'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Administration' }">
            <router-link to="/admin/users" class = "dp">{{translate("comptes")}} </router-link>
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
      <b-navbar-brand v-if="!isUserConnected" href="#" @click="showLoginModal" > <img src="../assets/Logos/login.svg" alt="Logo login" class="navbar-svg-login"></b-navbar-brand>
      <b-nav-item-dropdown v-if="isUserConnected" style="color: grey" :text="currentUser.email">
        <b-dropdown-item><router-link to="/panier" class = "dp">{{translate("monPanier")}}</router-link></b-dropdown-item>
        <b-dropdown-item ><router-link to="/commande" class = "dp">{{translate("mesCommandes")}}</router-link></b-dropdown-item>
        <b-dropdown-item v-if="isUserConnected" @click="disconnect" href="#" class = "dp">{{translate("seDeconnecter")}}</b-dropdown-item>
      </b-nav-item-dropdown>
      <img v-if="isUserAdmin" src="../assets/Logos/isAdminIcon.png" alt="admin" style="width: 25px;">
      <img v-if="isUserPrestataire" src="../assets/Logos/isPrestataireIcon.png" alt="prestataire" style="width: 25px;">

      <select v-model="selectedLanguage" id="selectedLanguage" @change="changeLanguage(selectedLanguage)">
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>

    </b-navbar>

    <b-sidebar id="mobile-nav" title="" width="250px" no-header v-model="isSidebarOpen">
      <b-button class="close-button" @click="isSidebarOpen = false">×</b-button>
      <b-nav vertical class="mt-2">
        <b-nav-item href="#">Informations</b-nav-item>
        <b-nav-item href="#">Carte</b-nav-item>
        <b-nav-item-dropdown text="Stands" right>
          <b-dropdown-item href="#">Nourriture</b-dropdown-item>
          <b-dropdown-item href="#">Boisson</b-dropdown-item>
          <b-dropdown-item href="#">Fanzone</b-dropdown-item>
          <b-dropdown-item href="#">Billeterie</b-dropdown-item>
          <b-dropdown-item href="#">Magasin</b-dropdown-item>
          <b-dropdown-item href="#">Activités</b-dropdown-item>
          <b-dropdown-item href="#">Découverte internationale</b-dropdown-item>
          <b-dropdown-item href="#">RATP</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown v-if="isUserAdmin" text="Gestion" right>
          <b-dropdown-item href="/AdminEditUsers">Comptes</b-dropdown-item>
          <b-dropdown-item href="/AdminEditRoles">Rôles</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-nav>
    </b-sidebar>
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

body, .b-navbar {
  font-family: 'Open Sans', sans-serif;
}

.navbar-svg-login {
  height: 40px;
  margin-left: auto;
}

.desktop-navbar {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 997;
  background-color: transparent !important;
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
