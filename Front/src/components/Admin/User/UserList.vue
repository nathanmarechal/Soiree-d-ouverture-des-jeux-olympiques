<template>
    <div class="user-list">
      <button v-if="isProtectorDelete" class="btn btn-danger" @click="removeAllUsers()">
              {{ translate("userList_supprimerTout") }}
      </button>
      <table>
        <thead>
          <tr>
            <th>{{translate("userList_1")}}</th>
            <th>{{translate("userList_2")}}</th>
            <th>{{translate("userList_3")}}</th> 
            <th>{{translate("userList_4")}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filterProtector ? filteredProtector : getAllUsers" :key="index">
            <td>{{ user.prenom }}</td>
            <td>{{ user.nom }}</td>
            <td>{{ user.email }}</td>
            <td>{{ getRoleName(user.id_role) }}</td>
            <td>
              <router-link :to="{ name: 'AdminEditUsers', params: { selected_user: user } }" class="btn btn-primary">{{translate("userList_5")}}</router-link>
              <button class="red-button" @click="removeUser(user.id_user)">{{translate("userList_6")}}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import {mapActions, mapGetters} from 'vuex';
  import {translate} from "../../../lang/translationService";
  import router from "@/router";


  export default{
    props: {
      isProtectorDelete: {
        type: Boolean,
        default: false,
      },
      filterProtector:{
      //contain all data that need to be shown
      type: Array,
      required: false,
      default: () => null,
    }
    },
    async mounted() {
      try {
        await this.loadData();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    computed: {
      ...mapGetters(['getAllUsers', 'getAllRoles','getCurrentUser']),
      filteredProtector: function(){
        // verify that the data in filterProtector is still in the getAllUsers so for each data in filterProtector, check if it is in getAllUsers or else remove it from filterProtector
        const filteredProtector = this.filterProtector.filter(data => this.getAllUsers.find(user => user.id_user === data.id_user));
        return filteredProtector;
      }
    },
    methods: {
      translate,
      ...mapActions(['getUsersStore', 'deleteUserStore', 'getRolesStore']),
      async loadData() {
        await this.getUsersStore();
        await this.getRolesStore();
      },
      async removeUser(id_user, noMessage = false, force = false) {
        const connectedUser = this.getCurrentUser;
        if (connectedUser.id_user === id_user) {
          window.alert(this.translate("userList_7"));
          return;
        }
        const user = this.getAllUsers.find(user => user.id_user === id_user)
        console.log("user", user);
        const confirmMessage = `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.prenom} ${user.nom} ?`;
        if (noMessage || confirm(confirmMessage)) {
          const ifHasStand = user.id_stand !== null;
          console.log("ifHasStand", ifHasStand);
          if (ifHasStand) {
            if(force){
              console.log("NEED TO IMPLEMENT THAT FUNCTIONALITY")

              window.alert('NEED TO IMPLEMENT THAT FUNCTIONALITY')
            }
            else{
              window.alert('ALERTEALERTeALERT')
              router.push(
                {
                  name: 'AdminDeleteCascadeProtector',
                  params: {
                    dataType: 'user',
                    dataProp: user,
                  },
                }
              );
              return;
            }
          }
          else{
            try {
             await this.deleteUserStore(user.id_user);
            } catch (error) {
             console.error('Erreur lors de la suppression de l\'utilisateur :', error);
              }
            }
          }
          console.log("this.$route.name", this.$route.name);
              if(this.$route.name !== 'AdminRoles'){
                console.log("filteredProtector", this.filteredProtector);
                if(this.filteredProtector.length === 0){
                  console.log("push to admin users");
                  router.push(
                    {
                      name: 'AdminRoles',
                    }
                  );
                  window.alert('Vous pouvez dorénavant supprimer le role')
                }
              }
        },
        getRoleName(roleId) {
          const role = this.getAllRoles.find(role => role.id_role === roleId);
          return role ? role.libelle : '';
        },
        removeAllUsers(){
          const confirmMessage = `Êtes-vous sûr de vouloir supprimer tous les utilisateurs ?`;
          if (confirm(confirmMessage)) {
            try {
              this.filteredProtector.forEach(async user => {
                this.removeUser(user.id_user, true, true);
              });
            } catch (error) {
              console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            }
          }
        },
      }
    }
  </script>
  
  <style scoped>
  .user-list {
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
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
  
  .blue-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #4d79ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  
  .blue-button:hover {
    background-color: #1a53ff;
  }
  
  .red-button:hover {
    background-color: #e60000;
  }

  </style>