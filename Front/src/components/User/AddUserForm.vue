<template>
  <div class="add-user-form">
    <h2>Add User</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="first-name">First Name:</label>
        <input type="text" id="first-name" v-model="firstName" required>
      </div>
      <div>
        <label for="last-name">Last Name:</label>
        <input type="text" id="last-name" v-model="lastName" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="role">Role:</label>
        <select id="role" v-model="role" required>
          <option value="">Sélectionner un role</option>
          <!--temp--><option value="prestataire">TempPrestataire</option>
          <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
        </select>
      </div>
      <div v-if="role === 'prestataire'">
        <div>
          <label for="type-prestation">Type Prestation</label>
          <select id="type-prestation" v-model="prestation" required>
            <option value="">Sélectionner un type de prestation</option>
            <option v-for="prestation in typePrestation" :key="prestation" :value="prestation">{{ prestation }}</option>
          </select>
        </div>
        <button v-if="!showStandForm" type="button" @click="showStandForm = true">Add Stand</button>
        <button v-if="showStandForm" class="red-button" type="button" @click="showStandForm = false">Remove Stand</button>
        <div v-if="showStandForm">
          <AddStandForm :users="users" :roles="roles" :type-Prestation="typePrestation" :type-zone="typeZone"></AddStandForm>
        </div>
      </div>
      <div>
        
      </div>
      <button class="blue-button" type="submit">Add User</button>
      <button class="red-button" type="button" @click="$emit('close')">Cancel</button>
    </form>
  </div>
</template>

<script>
import AddStandForm from './AddStandForm.vue';

export default {
  components: {
    AddStandForm,
  },
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
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      showStandForm: false,
      stand: '',
      list_roles: '',
      list_types: '',
    };
  },
  methods: {
    submitForm() {
      const newUser = {
        prenom: this.firstName,
        nom: this.lastName,
        email: this.email,
        role: this.role,
        stand: this.stand,
        type_prestation: this.typePrestation,
        type_zone: this.typeZone,
        zone_id: this.zoneId,
      };
      this.$emit('add-user', newUser);
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.role = '';
      this.stand = '';
      this.prestation = '';
      this.zoneType = '';
      this.zoneId = '';
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
</style>
