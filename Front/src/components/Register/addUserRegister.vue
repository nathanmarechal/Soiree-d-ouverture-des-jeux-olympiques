<template>
    <div class="add-user-form" >
      <div v-if="isPrestataire === null">
          <h2>Qui êtes vous ?</h2>
        <div class="form d-flex">
          <button type="button" class="bouton btn-success flex-grow-1" @click="setPrestataire">Prestataire</button>
          <button type="button" class="bouton btn-danger flex-grow-1" @click="setClient">Client</button>
        </div>
      </div>
  
      <form v-if="isPrestataire === false" @submit.prevent="submitFormClient" class="d-flex gap-3 flex-column justify-content-center" style="width: 40vh">
  
        <div class="form-group">
          <label for="first-name">{{translate("addUser_1")}} </label>
          <input type="text" id="first-name" v-model="utilisateur.firstName" required>
        </div>
  
  
        <div class="form-group">
          <label for="last-name">{{translate("addUser_2")}} </label>
          <input type="text" id="last-name" v-model="utilisateur.lastName" required>
        </div>
        <div class="form-group">
          <label for="email">{{translate("addUser_3")}} </label>
          <input type="email" id="email" v-model="utilisateur.email" required>
        </div>
  
        <div  class="form-group">
          <label for="password">{{translate("addUser_4")}} </label>
          <input type="password" id="password" v-model="utilisateur.password" required>
        </div>
  
        <div class="form-group">
          <label for="code_postal">{{translate("addUser_5")}} </label>
          <input type="number" id="code_postal" v-model="utilisateur.code_postal" required>
        </div>
  
        <div class="form-group">
          <label for="adresse">{{translate("addUser_6")}} </label>
          <input type="text" id="adresse" v-model="utilisateur.adresse" required>
        </div>
  
        <div class="form-group">
          <label for="commune">{{translate("addUser_7")}} </label>
          <input type="text" id="commune" v-model="utilisateur.commune" required>
        </div>
  
  
        <div>
          <button type="submit" class="btn btn-success">{{translate("addUser_11")}}</button>
          <button @click="isPrestataire = null" class="btn btn-danger">{{translate("addUser_12")}}</button>
        </div>
      </form>
  
      <form v-if="isPrestataire === true" @submit.prevent="submitFormPrestataire" class="d-flex gap-3 flex-column justify-content-center" style="width: 40vh">
  
        <div class="form-group">
          <label for="first-name">prestataire : {{translate("addUser_1")}} </label>
          <input type="text" id="first-name" v-model="utilisateur.firstName" required>
        </div>
  
  
        <div class="form-group">
          <label for="last-name">{{translate("addUser_2")}} </label>
          <input type="text" id="last-name" v-model="utilisateur.lastName" required>
        </div>
        <div class="form-group">
          <label for="email">{{translate("addUser_3")}} </label>
          <input type="email" id="email" v-model="utilisateur.email" required>
        </div>
  
        <div  class="form-group">
          <label for="password">{{translate("addUser_4")}} </label>
          <input type="password" id="password" v-model="utilisateur.password" required>
        </div>
  
        <div class="form-group">
          <label for="code_postal">{{translate("addUser_5")}} </label>
          <input type="number" id="code_postal" v-model="utilisateur.code_postal" required>
        </div>
  
        <div class="form-group">
          <label for="adresse">{{translate("addUser_6")}} </label>
          <input type="text" id="adresse" v-model="utilisateur.adresse" required>
        </div>
  
        <div class="form-group">
          <label for="commune">{{translate("addUser_7")}} </label>
          <input type="text" id="commune" v-model="utilisateur.commune" required>
        </div>
  
        <div class="form-group">
          <label for="nomStand">nom de votre stand </label>
          <input type="text" id="commune" v-model="stand.nom_stand" required>
        </div>
  
        <div class="form-group">
          <label for="imageStand">image du stand </label>
          <input type="text" id="commune" v-model="stand.image_stand" required>
        </div>

  
        <div class="form-group">
          <label for="descriptionStand">descriptionStand </label>
          <input type="text" id="commune" v-model="stand.description_stand" required>
        </div>

  
        <div>
          <button type="submit" class="btn btn-success">{{translate("addUser_11")}}</button>
          <button @click="isPrestataire = null" class="btn btn-danger">{{translate("addUser_12")}}</button>
        </div>
      </form>
  
    </div>
  </template>
  
  <script>
  import {mapActions, mapGetters} from "vuex";
  import {translate} from "../../lang/translationService";
  
  
  export default {
    data() {
      return {
        isPrestataire: null,
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
        stand: {
          nom_stand: "",
          image_stand: "",
          description_stand: "",
          id_emplacement: 50,
          id_zone: null,
          id_type_prestation: null,
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
      translate,
      ...mapActions(['getRolesStore', 'createUserStore', 'createUsersWithStandStore']),
  
      setPrestataire() {
        this.isPrestataire = true;
        this.utilisateur.id_role = 2;
      },
      setClient() {
        this.isPrestataire = false;
        this.utilisateur.id_role = 3;
      },
      async loadData() {
        try {
          if (this.getAllRoles.length === 0) {
            await this.getRolesStore();
          }
        } catch (error) {
          console.error('Erreur lors du chargement des données :', error);
        }
      },
      async submitFormClient() {
        try {
          await this.createUserStore({
            user: this.utilisateur,
          });
          this.$router.push('/');
        } catch (error) {
          console.error('Erreur lors de la création de l\'utilisateur :', error);
        }
      },
      async submitFormPrestataire() {
        try {
          await this.createUsersWithStandStore({
            user: this.utilisateur,
            stand: this.stand,
          });
          this.$router.push('/');
        } catch (error) {
          console.error('Erreur lors de la création de l\'utilisateur :', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  
  .form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  
  .bouton {
    min-width: 300px;
    height: 50vh;
    font-size: 2em;
    border: none;
    margin-right: 5%; /* Add space to the right of each button */
  }
  
  .btn-success {
    background-color: #5cb85c; /* Change the background color to a nice green */
    color: white; /* Change the text color to white */
  }
  
  .btn-danger {
    background-color: #d9534f; /* Change the background color to a nice red */
    color: white; /* Change the text color to white */
  }
  
  
  .add-user-form {
    margin-top: 50px;
    margin-bottom: 100px;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
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
  