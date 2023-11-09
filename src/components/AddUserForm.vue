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
            <option value="Admin">Admin</option>
            <option value="Vendeur">vendeur</option>
          </select>
        </div>
        <div>
          <label for="stand">Stand Name:</label>
          <select id="stand" v-model="stand" required>
            <option value="">Select a stand</option>
            <option v-for="(stand, index) in stands" :key="index" :value="stand">{{ stand.nom_stand }}</option>
          </select>
        </div>
        <button class="blue-button" type="submit">Add User</button>
        <button class="red-button" type="button" @click="$emit('close')">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      users: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        stand: '',
        stands: [
          { nom_stand: 'Stand 1' },
          { nom_stand: 'Stand 2' },
          { nom_stand: 'Stand 3' },
        ],
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
        };
        this.$emit('add-user', newUser);
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.role = '';
        this.stand = '';
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