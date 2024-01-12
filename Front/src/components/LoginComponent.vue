<template>
  <div v-if="isLoginOpen">
    <div class="d-flex justify-content-center align-items-center overlay">
      <div class="login-box bg-white p-4 rounded shadow">
        <h2 class="text-center mb-4">{{translate("login_title")}}</h2>
        <div v-if="incorrectLog"><span style="color: red">{{translate("login_errorPasswordForm")}}</span></div>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="email">{{translate("login_0")}}</label>
            <input type="email" v-model="email" id="email" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="password">{{translate("login_1")}}</label>
            <input type="password" v-model="password" id="password" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary w-100">{{translate("login_2")}}</button>
        </form>
        <a @click="closeModal"> <router-link to="/sign-up" > {{translate("login_3")}}</router-link> </a>
        <button @click="closeModal" class="btn btn-danger w-100">{{translate("login_4")}}</button>

      </div>
    </div>
  </div> 
</template>

<script>
import {getSession} from "@/services/login.service";
import {getUserFromSessionId} from "@/services/utilisateur.service";
import {mapActions} from "vuex";
import {getPanierUserCourant} from "@/services/panier.service";
import {getCommandeUserCourant, getScheduleByUserId} from "@/services/commande.service";
import {translate} from "../lang/translationService";
import {getDroitsRole} from "@/services/droit.service";

export default {
  props : ['isLoginOpen'],
  data() {
    return {
      sessionId: '',
      email: '',
      incorrectLog: false,
      password: '', //variable locale
    }
  },

  computed: {
    currentUser() {
      return {
        session_id: this.sessionId,
        id_user: null,
        email: this.email,
        nom : null,
        prenom : null,
        code_postal : null,
        adresse : null,
        commune : null,
        panier : null,
        id_role : null,
        id_stand : null,
        droits : []
      };
    },
  },


  /*
  computed: {
    email: {
      get() {
        return this.$store.getters.getemail;
      },
      set(value) {
        this.$store.commit('SET_EMAIL', value);
      }
    },
    password: {
      get() {
        return this.$store.getters.getpassword;
      },
      set(value) {
        this.$store.commit('SET_PASSWORD', value);
      }
    },
  },

   */
  methods: {
    translate,
    ...mapActions('user', ['getPanierUserCourantStore', "getCommandeUserCourantStore"]),

    closeModal() {
      this.$store.commit('user/SET_LOGIN_MODAL', false);
    },

    isEmpty() {
      return this.email === '' || this.password === '';
    },

    isEmailValid() {
      return this.email.includes('@')
    },
    isPasswordValid() {
      return this.password.length >= 8
    },

    async submitForm() {

      this.incorrectLog = false;

      if (this.isEmailValid() && this.isPasswordValid()) {
        try {
          const sessionResponse = await getSession(this.email, this.password);

          this.sessionId = sessionResponse;

          if (this.sessionId.error != 1) {
            const userData = await getUserFromSessionId(this.sessionId);

            // Mise à jour des données de l'utilisateur
            this.currentUser = { ...this.currentUser, ...userData };
            this.currentUser.solde = parseFloat(userData.solde);
            this.$store.commit('user/SET_CURRENT_USER', this.currentUser);

            // Mise à jour des autres données associées à l'utilisateur
            const panier = await getPanierUserCourant(userData.id_user);
            this.$store.commit('user/SET_PANIER_USER_COURANT', panier);

            const commandes = await getCommandeUserCourant(userData.id_user);
            this.$store.commit('user/SET_COMMANDES_USER_COURANT', commandes);

            const schedule = await getScheduleByUserId(userData.id_user);
            this.$store.commit('user/SET_SCHEDULE', schedule);

            const droits = await getDroitsRole(userData.id_role);
            this.$store.commit('user/SET_DROITS_USER_COURANT', droits);

            this.$store.commit('user/SET_IS_USER_CONNECTED', true);
            this.closeModal();
          } else {
            this.incorrectLog = true;
          }

        } catch (error) {
          alert('Une erreur est survenue lors du traitement de la requête.');
          console.error(error);
        } finally {
          this.email = "";
          this.password = "";
        }
      } else {
        alert('Veuillez remplir correctement le formulaire !');
      }
    }
  }
}
</script>

<style scoped>
.close-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #555;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* fond noir transparent */
  z-index: 1000;
}

.login-box {
  width: 300px;
  max-width: 90%;
}

</style>