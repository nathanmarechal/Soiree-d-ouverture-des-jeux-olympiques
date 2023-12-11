<template>
    <div class="user-list">
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
          <tr v-for="(user, index) in getAllUsers" :key="index">
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

  export default{
    async mounted() {
      try {
        await this.loadData();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    computed: {
      ...mapGetters(['getAllUsers', 'getAllRoles']),
    },
    methods: {
      translate,
      ...mapActions(['getUsersStore', 'deleteUserStore', 'getRolesStore']),
      async loadData() {
        await this.getUsersStore();
        await this.getRolesStore();
      },
      async removeUser(index) {
        console.log("users", this.getAllUsers)
        console.log("index", index);
        const user = this.getAllUsers.find(user => user.id_user === index);
        console.log("aaa", user);
        const confirmMessage = `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.prenom} ${user.nom} ?`;
        if (confirm(confirmMessage)) {
          try {
            await this.deleteUserStore(user.id_user);
          } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            }
          }
        },
        getRoleName(roleId) {
          const role = this.getAllRoles.find(role => role.id_role === roleId);
          return role ? role.libelle : '';
        }
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