<template>
  <div v-if="isLoginOpen">
  <div class="d-flex justify-content-center align-items-center overlay">
    <div class="login-box bg-white p-4 rounded shadow">

      <button class="close-btn" @click="closeModal">X</button>
      <h2 class="text-center mb-4">Login</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe:</label>
          <input type="password" v-model="password" id="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">Se connecter</button>
      </form>
       <router-link to="/sign-up" @click="closeModal">s'inscrire</router-link>

    </div>
  </div>
</div>
</template>

<script>
import {getSession} from "@/services/login.service";

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
        role : null,
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

              this.sessionId = res
              if(this.sessionId!="")
              {
                this.$store.commit('SET_CURRENT_USER', this.currentUser)
                console.log("Current user :", JSON.stringify(this.currentUser, null, 2));

                //this.$store.commit('SET_EMAIL', this.email);
                //this.$store.commit('SET_PASSWORD', this.password);
                this.$store.commit('SET_IS_USER_CONNECTED', true);
                this.closeModal();
              }
              else
              {
                alert("email ou mot de passe incorrect")
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