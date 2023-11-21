<template>
  <div>
    <b-navbar toggleable="md" class="desktop-navbar">
      <b-navbar-brand href="#"><img src="../assets/Logos/logovecto.svg" alt="Logo" class="navbar-logo"></b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/" @mouseover="underline = 'Accueil'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Accueil' }">Accueil</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/information" @mouseover="underline = 'Informations'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Informations' }">Informations</router-link>
          </b-nav-item>
          <b-nav-item to="/map" href="#" @mouseover="underline = 'Carte'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Carte' }">Carte</b-nav-item>
          <b-nav-item to="/shop" href="#" @mouseover="underline = 'hop'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Shop' }">Shop</b-nav-item>

          <b-nav-item-dropdown right text="Stands" @mouseover="underline = 'Stands'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Stands' }">
            <b-dropdown-item href="#" class = "dp"><router-link to="/Shop" @mouseover="underline = 'Informations'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Informations' }">Nourriture</router-link></b-dropdown-item>
            <b-dropdown-item href="#" class = "dp">Boisson</b-dropdown-item>
            <b-dropdown-item href="#" class = "dp">Fanzone</b-dropdown-item>
            <b-dropdown-item href="#" class = "dp">Billeterie</b-dropdown-item>
            <b-dropdown-item href="#" class = "dp">Magasin</b-dropdown-item>
            <b-dropdown-item href="#" class = "dp">Activités</b-dropdown-item>
            <b-dropdown-item href="#" class = "dp">Découverte internationale</b-dropdown-item>
            <b-dropdown-item href="#" class = "dp">RATP</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right text="Gestion" @mouseover="underline = 'Gestion'" @mouseleave="underline = null" :class="{ 'underline': underline === 'Gestion' }">
            <b-dropdown-item href="/AdminEditUsers" class = "dp">Comptes</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-brand href="#" @click="showLoginModal" > <img src="../assets/Logos/login.svg" alt="Logo login" class="navbar-svg-login"></b-navbar-brand>
      <b-nav-item-dropdown v-if="isUserConnected" style="color: grey" :text="email">
        <b-dropdown-item href="#" class = "dp">Mes espaces</b-dropdown-item>
        <b-dropdown-item href="#" class = "dp">Mes informations</b-dropdown-item>
        <b-dropdown-item v-if="isUserConnected" @click="disconnect" href="#" class = "dp">se déconnecter</b-dropdown-item>
      </b-nav-item-dropdown>
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
        <b-nav-item-dropdown text="Gestion" right>
          <b-dropdown-item href="/AdminEditUsers">Comptes</b-dropdown-item>
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

export default {
  data() {
    return {
      underline: null,
      isSidebarOpen: false,
    };
  },
  computed: {
    isLoginOpen() {
      return this.$store.getters.isLoginOpen;
    },
    isUserConnected() {
      return this.$store.getters.isUserConnected;
    },
    email() {
      return this.$store.getters.getemail;
    },
  },
  components: {
    'login-component': LoginComponent
  },
  methods: {
    showLoginModal() {
      this.$store.commit('SET_LOGIN_MODAL', true);
    },
    disconnect() {
      this.$store.commit('SET_USER_CONNECTED', false);
      this.$store.commit('SET_EMAIL', '');
      this.$store.commit('SET_PASSWORD', '');
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
