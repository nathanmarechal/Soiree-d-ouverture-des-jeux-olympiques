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
              <router-link :to="{ name: 'AdminEditUsers', params: { selected_user: user } }" class="blue-button">{{translate("userList_5")}}</router-link>
              <button class="red-button" @click="deleteUser(index)">{{translate("userList_6")}}</button>
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
      ...mapGetters(['getAllUsers', 'getFilteredUsers', 'getAllRoles']),
    },
    methods: {
      translate,
      ...mapActions(['getUsersStore', 'deleteUserStore']),
      async loadData() {
        if (this.getAllUsers.length === 0)
          await this.getUsersStore();
      },
      async deleteUser(index) {
        const user = this.filteredUsers[index];
        const confirmMessage = `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.prenom} ${user.nom} ?`;
        if (confirm(confirmMessage)) {
          try {
            await this.deleteUserStore(user.id_utilisateur);
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