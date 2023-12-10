<template>
  <div class="add-user-form" >
    <form @submit.prevent="submitForm" class="d-flex gap-3 flex-column justify-content-center" style="width: 40vh">
      <div class="form-group">
        <label for="first-name">prénom</label>
        <input type="text" id="first-name" v-model="utilisateur.firstName" required>

      </div>
      <div class="form-group">
        <label for="last-name">nom</label>
        <input type="text" id="last-name" v-model="utilisateur.lastName" required>
      </div>
      <div class="form-group">
        <label for="email">e-mail</label>
        <input type="email" id="email" v-model="utilisateur.email" required>
      </div>

      <div  class="form-group">
        <label for="password">mot de passe</label>
        <input type="password" id="password" v-model="utilisateur.password" required>
      </div>

      <div class="form-group">
        <label for="code_postal">code postal</label>
        <input type="number" id="code_postal" v-model="utilisateur.code_postal" required>
      </div>

      <div class="form-group">
        <label for="adresse">adresse</label>
        <input type="text" id="adresse" v-model="utilisateur.adresse" required>
      </div>

      <div class="form-group">
        <label for="commune">commune</label>
        <input type="text" id="commune" v-model="utilisateur.commune" required>
      </div>

      <div class="form-group" >
        <label for="role ">Role</label>
        <select id="role" v-model="utilisateur.id_role" required>
          <option value="">Sélectionner un rôle</option>
          <option v-for="role in getAllRoles" :key="role.id_role" :value="role">{{ role.libelle }}</option>
        </select>
      </div>
      <div>
        <button type="submit" class="btn btn-success">Add User</button>
        <router-link to="/admin/users" class="btn btn-danger">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";


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
    ...mapGetters(['getAllRoles', 'getCurrentUser'])
  },
  methods: {
    ...mapActions(['getRolesStore', 'createUserStore']),
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
        let role = this.getAllRoles.find(role => role.id_role === this.utilisateur.id_role);
        if (role)
          this.utilisateur.role = role.libelle;

        await this.createUserStore({
          user: this.utilisateur,
          session_id: this.getCurrentUser.session_id
        });
        this.$emit('close');
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
