<template>
  <div class="add-user-form" ><br><br><br>
    <form @submit.prevent="submitForm" class="d-flex gap-3 flex-column justify-content-center" style="width: 40vh">
      <div class="form-group">
        <label for="first-name">{{translate("addUser_1")}}</label>
        <input type="text" id="first-name" v-model="utilisateur.firstName" required>

      </div>
      <div class="form-group">
        <label for="last-name">{{translate("addUser_2")}}</label>
        <input type="text" id="last-name" v-model="utilisateur.lastName" required>
      </div>
      <div class="form-group">
        <label for="email">{{translate("addUser_3")}}</label>
        <input type="email" id="email" v-model="utilisateur.email" required>
      </div>

      <div  class="form-group">
        <label for="password">{{translate("addUser_4")}}</label>
        <input type="password" id="password" v-model="utilisateur.password" required>
      </div>

      <div class="form-group">
        <label for="code_postal">{{translate("addUser_5")}}</label>
        <input type="number" id="code_postal" v-model="utilisateur.code_postal" required>
      </div>

      <div class="form-group">
        <label for="adresse">{{translate("addUser_6")}}</label>
        <input type="text" id="adresse" v-model="utilisateur.adresse" required>
      </div>

      <div class="form-group">
        <label for="commune">{{translate("addUser_7")}}</label>
        <input type="text" id="commune" v-model="utilisateur.commune" required>
      </div>

      <div class="form-group">
        <label for="solde">{{translate("addUser_8")}}</label>
        <input type="number" id="solde" v-model="utilisateur.solde" value="0" required>
      </div>

      <div class="form-group" >
        <label for="role ">{{translate("addUser_9")}}</label>
        <select id="role" v-model="utilisateur.id_role" required>
          <option value="">{{translate("addUser_10")}}</option>
          <option v-for="role in getAllRoles" :key="role.id_role" :value="role">{{ role.libelle }}</option>
        </select>
      </div>
      <div>
        <button type="submit" class="btn btn-success">{{translate("addUser_11")}}</button>
        <router-link to="/admin/users" class="btn btn-danger">{{translate("addUser_12")}}</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {translate} from "@/lang/translationService";
import sha256 from "crypto-js/sha256";


export default {
  data() {
    return {
      utilisateur: {
        prenom: "",
        nom: "",
        email: "",
        password: "",
        adresse: "",
        code_postal: "",
        commune: "",
        solde: 0,
        id_role: null,
      },
    };
  },
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters('user', ['getCurrentUser']),
    ...mapGetters('roleEtDroit', ['getAllRoles']),
  },
  methods: {
    translate,
    ...mapActions('user', ['createUserStore']),
    ...mapActions('roleEtDroit', ['getRolesStore']),
    async loadData(){
      try {
        if (this.getAllRoles.length === 0)
          await this.getRolesStore();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    async submitForm() {
      try {
        let role = this.utilisateur.id_role.id_role;
        if (role)
          this.utilisateur.id_role = role;

        const user = { ...this.utilisateur };

        const passwordHash = sha256(user.password).toString();

        user.password = passwordHash;


        await this.createUserStore({
          user: user,
        });
        this.$router.push('/admin/users');
      } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
      }
    },
  }
}
</script>

<style scoped>
.add-user-form {
  margin-top: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  margin-bottom: 5px;
}

input, select {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

select {
  width: 100%;
}

button[type="submit"] {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4d79ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

button[type="submit"]:hover {
  background-color: #1a53ff;
}

.red-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.red-button:hover {
  background-color: #e60000;
}

.form {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
}
</style>
