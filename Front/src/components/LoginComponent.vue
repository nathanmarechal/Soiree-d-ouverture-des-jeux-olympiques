<template>
  <div v-if="isLoginOpen">
    <div class="d-flex justify-content-center align-items-center overlay">
      <div class=" d-flex flex-column gap-3 login-box bg-white p-4 rounded shadow">
        <h2 class="text-center mb-4">{{translate("login_title")}}</h2>
        <div v-if="incorrectLog"><span style="color: red">{{translate("login_errorPasswordForm")}}</span></div>
        <form  class="d-flex flex-column gap-1" @submit.prevent="submitForm">
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

        <div class="d-flex flex-column gap-1">
          <button type="button" class="btn btn-warning" @click="closeModalAndNavigate">
            {{ translate("login_3") }}
          </button>
          <button @click="closeModal" class="btn btn-danger w-100">
            {{ translate("login_4") }}
          </button>
        </div>



      </div>
    </div>
  </div> 
</template>

<script>
import {getSession} from "@/services/login.service";
import {getUserFromSessionId} from "@/services/utilisateur.service";
import {getPanierUserCourant} from "@/services/panier.service";
import {getCommandeUserCourant, getScheduleByUserId} from "@/services/commande.service";
import {translate} from "@/lang/translationService";
import {getDroitsRole} from "@/services/droit.service";

export default {
  props : ['isLoginOpen'],
  data() {
    return {
      sessionId: '',
      email: '',
      incorrectLog : false,
      password: '',
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
  methods: {
    translate,
    closeModal() {
      this.$store.commit('user/SET_LOGIN_MODAL', false);
    },

    closeModalAndNavigate() {
      this.closeModal();
      this.$router.push("/sign-up");
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

    submitForm() {
      this.incorrectLog = false;

      if (this.isEmailValid() && this.isPasswordValid()) {
        //alert('Formulaire envoyé !')
        getSession(this.email,this.password)
            .then(res=> {
              this.sessionId = res;
              if(this.sessionId.error!=1){
                getUserFromSessionId(this.sessionId)
                    .then(res=>{
                      this.currentUser.id_user = res.id_user;
                      this.currentUser.email = res.email;
                      this.currentUser.nom = res.nom;
                      this.currentUser.prenom = res.prenom;
                      this.currentUser.code_postal = res.code_postal;
                      this.currentUser.adresse = res.adresse;
                      this.currentUser.commune = res.commune;
                      this.currentUser.id_role = res.id_role;
                      this.currentUser.id_stand = res.id_stand;
                      this.currentUser.solde = parseFloat(res.solde);
                      this.$store.commit('user/SET_CURRENT_USER', this.currentUser)
                      getPanierUserCourant(this.sessionId)
                          .then(res=>{
                            this.$store.commit('user/SET_PANIER_USER_COURANT', res)
                          })
                      getCommandeUserCourant(this.sessionId)
                          .then(res=>{
                            this.$store.commit('user/SET_COMMANDES_USER_COURANT', res)
                          })
                      getScheduleByUserId(this.sessionId)
                          .then(res=>{
                            this.$store.commit('user/SET_SCHEDULE', res)
                          })
                      getDroitsRole(res.id_role)
                          .then(res=>{
                            this.$store.commit('user/SET_DROITS_USER_COURANT', res)
                          })

                      this.email=""
                      this.password=""

                      this.$store.commit('user/SET_IS_USER_CONNECTED', true);
                      this.closeModal();
                    })

              }
              else
              {
                this.incorrectLog = true; // Activation du message d'erreur
                this.email = "";
                this.password = "";
              }
            }).catch(error => {
          // Gérer d'autres erreurs potentielles ici
          console.error("Erreur lors de la connexion", error);
          this.incorrectLog = true; // Activation du message d'erreur en cas d'erreur système
        });
      } else {
        alert('Veuillez remplir correctement le formulaire !')
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