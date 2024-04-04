<template>
  <div id="app">
    <div class="nav">
      <PageNavbar/>
    </div>
    <router-link to="/"></router-link>
    <div class="content">
      <router-view></router-view>
    </div>
    <PageFooter />
  </div>
</template>


<script>

import PageNavbar from './components/PageNavbar.vue'
import PageFooter from './components/PageFooter.vue'
import {getSessionCookies} from "@/services/login.service";
import {getUserFromSessionId} from "@/services/utilisateur.service";
import {getPanierUserCourant} from "@/services/panier.service";
import {getCommandeUserCourant, getScheduleByUserId} from "@/services/commande.service";
import {getDroitsRole} from "@/services/droit.service";

export default {
  components: {
    PageNavbar,
    PageFooter
  },
  async mounted() {
      try {
        const session_id = await getSessionCookies();

        this.sessionId = session_id;

        if (!session_id) {
          return;
        }

        await this.$store.dispatch('user/setSessionId', session_id);

        if (this.sessionId.error === 1) {
          throw new Error("Identifiants incorrects");
        }

        const user = await getUserFromSessionId();
        const panier = await getPanierUserCourant();
        const commandes = await getCommandeUserCourant();
        const schedule = await getScheduleByUserId();
        const droits = await getDroitsRole(user.id_role);

        this.$store.commit('user/SET_CURRENT_USER', user);
        this.$store.commit('user/SET_PANIER_USER_COURANT', panier);
        this.$store.commit('user/SET_COMMANDES_USER_COURANT', commandes);
        this.$store.commit('user/SET_SCHEDULE', schedule);
        this.$store.commit('user/SET_DROITS_USER_COURANT', droits);

        this.$store.commit('user/SET_IS_USER_CONNECTED', true);
      } catch (error) {
        console.error("pas de session", error);
      }
    }
}
</script>

<style scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex: 1 0 auto;
}

footer {
  flex-shrink: 0;
}
.nav {
  position: fixed;
  display: block;
  margin-left: auto;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1050;
  background-color: rgba(236, 240, 241, 0.9);
  box-shadow: 0 2px 5px rgba(255, 255, 255, 0.2);
  border-radius: 2vh;
}


#app::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(~@/assets/Logos/logovecto-rm.png) repeat;
  background-color: #FEFEE2 ;
  background-size: 10%; /* Réduire la taille de l'image à 50% */
  background-position: 20px 20px; /* Espacer les images de 20px */
  opacity: 0.1;
  z-index: -1;
}
</style>