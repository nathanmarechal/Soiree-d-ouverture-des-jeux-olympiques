<template>
  <div class="add-user-form" >
    <form @submit.prevent="submitForm" class="" style="width: 40vh">
      <div class="form">
        <label for="first-name">prénom</label>
        <input type="text" id="first-name" v-model="firstName" required>

      </div>
      <div class="form">
        <label for="last-name">nom</label>
        <input type="text" id="last-name" v-model="lastName" required>
      </div>
      <div class="form">
        <label for="email">e-mail</label>
        <input type="email" id="email" v-model="email" required>
      </div>

      <div  class="form">
        <label for="password">mot de passe</label>
        <input type="password" id="password" v-model="password" required>
      </div>

      <div class="form">
        <label for="code_postal">code postal</label>
        <input type="number" id="code_postal" v-model="code_postal" required>
      </div>

      <div class="form">
        <label for="adresse">adresse</label>
        <input type="text" id="adresse" v-model="adresse" required>
      </div>

      <div class="form">
        <label for="commune">commune</label>
        <input type="text" id="commune" v-model="commune" required>
      </div>

      <div class="form" >
        <label for="role ">Role</label>
        <select id="role" v-model="role" required>
          <option value="">Sélectionner un rôle</option>
          <option v-for="role in roles" :key="role.id_role" :value="role">{{ role.libelle }}</option>
        </select>
      </div>

      <div v-if="role.libelle === 'prestataire'" style="width: 100%">
        <button v-if="showStandForm" class="red-button" type="button" @click="showStandForm = false">Remove Stand</button>
          <AddStandForm :users="users" :roles="roles" :type-Prestation="typePrestation" :type-zone="typeZone" ></AddStandForm>
      </div>
      <div class="form">
        <button class="blue-button" type="submit">Add User</button>
        <button class="red-button" type="button" @click="$emit('close')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import AddStandForm from '../User/AddStandForm.vue';
import {createUser} from "@/services/utilisateur.service";
import {mapActions} from "vuex";


export default {
  components: {
    AddStandForm,
  },
  /*
  props: {
    users: {
      type: Array,
      required: true,
    },
    roles: {
      type: Array,
      required: true,
    },
    typePrestation: {
      type: Array,
      required: true,
    },
    typeZone: {
      type: Array,
      required: true,
    }
  },
     */

  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      password: '',
      adresse: '',
      code_postal: '',
      commune: '',
      roles : [],
      showStandForm: false,
      //stand: '',
      //list_roles: '',
      //list_types: '',
    };
  },
  async created() {
    //this.$store.dispatch('getRoles');
    this.roles = await this.getRoles();
  },
  /*
  computed: {
    roles() {
      return this.$store.state.roles;
    }
  },
   */
  methods: {
    ...mapActions(['getRoles']),
    submitForm() {
      console.log("role selectionné " + this.role)
      const newUser = {
        prenom: this.firstName,
        nom: this.lastName,
        email: this.email,
        password: this.password,
        //role: this.role,

        adresse: this.adresse,
        code_postal: this.code_postal,
        commune: this.commune,
        id_role: this.role.id_role,
        //id_stand: this.stand,
        id_stand : null,
        session_id : this.$store.getters.getSessionId,
        //stand: this.stand,
        //type_prestation: this.typePrestation,
        //type_zone: this.typeZone,
        //zone_id: this.zoneId,
      };

      /*this.$emit('add-user', newUser);
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.role = '';
      this.stand = '';*/


      //this.prestation = '';
      //this.zoneType = '';
      //this.zoneId = '';

      console.log(newUser)
      createUser(newUser)
    },

    validateStand() {
      // Add your validation logic here
      if (this.stand === '') {
        alert('Please enter a valid stand');
      } else {
        // Stand is valid, perform any additional logic here
        console.log('Stand is valid');
      }
    },

  },
};
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
