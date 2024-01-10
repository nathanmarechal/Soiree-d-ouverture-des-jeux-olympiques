<template>
  <div v-if="isLoginOpen">
    <div class="d-flex justify-content-center align-items-center overlay">
      <div class="login-box bg-white p-4 rounded shadow">

        <button class="close-btn" @click="closeModal">X</button>
        <h2 class="text-center mb-4">{{translate("login_title")}}</h2>
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
      </div>
    </div>
  </div> 
</template>

<script>
import {getSession} from "@/services/login.service";
import {getUserFromSessionId} from "@/services/utilisateur.service";
import {mapActions, mapMutations} from "vuex";
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
    ...mapActions(['getPanierUserCourantStore', "getCommandeUserCourantStore"]),
    ...mapMutations(['GENERATE_SCHEDULE']),

    closeModal() {
      this.$store.commit('SET_LOGIN_MODAL', false);
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
      if (this.isEmailValid() && this.isPasswordValid()) {
        //alert('Formulaire envoyé !')
        getSession(this.email,this.password)
            .then(res=> {
              //getUserData()
              this.sessionId = res;
              if(this.sessionId!=""){
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
                      this.$store.commit('SET_CURRENT_USER', this.currentUser)
                      console.log("id_user : ", this.currentUser.id_user)
                      getPanierUserCourant(res.id_user)
                          .then(res=>{
                            console.log("panier : ", res)
                            this.$store.commit('SET_PANIER_USER_COURANT', res)
                          })
                      getCommandeUserCourant(res.id_user)
                          .then(res=>{
                            console.log("commande : ", res)
                            this.$store.commit('SET_COMMANDES_USER_COURANT', res)
                          })
                      getScheduleByUserId(res.id_user)
                          .then(res=>{
                            console.log("schedule : ", res)
                            this.$store.commit('SET_SCHEDULE', res)
                          })
                      getDroitsRole(res.id_role)
                          .then(res=>{
                            console.log("droits : ", res)
                            this.$store.commit('SET_DROITS_USER_COURANT', res)
                            console.log("state droits : "+this.$store.getters.getCurrentUser.droits)
                          })

                      this.email=""
                      this.password=""

                      this.$store.commit('SET_IS_USER_CONNECTED', true);
                      this.closeModal();
//                      console.log("Current user :", JSON.stringify(this.currentUser, null, 2));
                    })

              }
              else
              {
                alert(this.translate("emailOuMdpIncorrect"))
                this.email=""
                this.password=""
              }
            })

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