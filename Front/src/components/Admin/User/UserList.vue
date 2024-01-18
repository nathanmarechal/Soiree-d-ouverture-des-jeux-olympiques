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
            <th>{{translate("userList_7")}}</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filterProtector ? filteredProtector : getAllUsers" :key="index">
            <td>{{ user.prenom }}</td>
            <td>{{ user.nom }}</td>
            <td>{{ user.email }}</td>
            <td>{{ getRoleName(user.id_role) }}</td>
            <td>
              <div v-if="!isCurrentUser(user)">
                <router-link v-if="!isProtectorDelete" :to="{ name: 'AdminEditUsers', params: { selected_user: user } }" class="btn btn-primary">{{translate("userList_5")}}</router-link>
                <button class="red-button" @click="removeUser(user.id_user)">{{translate("userList_6")}}</button>
              </div>
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
      ...mapGetters('roleEtDroit', ['getAllRoles']),
      ...mapGetters('user', ['getCurrentUser','getAllUsers']),
      ...mapGetters('prestationEtType', ['getAllPrestation']),
      ...mapGetters('stands' , ['getAllStand']),
      filteredProtector: function(){
        if (this.filterProtector != null){
          const filteredProtector = this.filterProtector.filter(data => this.getAllUsers.find(user => user.id_user === data.id_user));
          return filteredProtector;}
        return null;
      }
    },
    methods: {
      isCurrentUser(user){
        return user.id_user === this.getCurrentUser.id_user
      },
      translate,
      ...mapActions('roleEtDroit', ['getRolesStore']),
      ...mapActions('user', ['getUsersStore', 'deleteUserStore']),
      ...mapActions('prestationEtType', ['getPrestationsStore','deletePrestationStore']),
      ...mapActions('stands', ['getStandsStore','deleteStandStore']),
      async loadData() {
        await this.getUsersStore();
        await this.getRolesStore();
        await this.getPrestationsStore();
        await this.getStandsStore();
        if (this.isProtectorDelete && this.filteredProtector.length === 0){
          router.push(
            {
              name: 'AdminRoles',
            }
          );
        }
      },
      async removeUser(id_user, noMessage = false, force = false) {
        const connectedUser = this.getCurrentUser;
        if (connectedUser.id_user === id_user) {
          window.alert(this.translate("userList_7"));
          return;
        }
        const user = this.getAllUsers.find(user => user.id_user === id_user)
        const confirmMessage = `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.prenom} ${user.nom} ?`;
        if (noMessage || confirm(confirmMessage)) {
          const ifHasStand = user.id_stand !== null;
          if (ifHasStand) {
            if(force){
              try {
                const id_stand = user.id_stand;
                const id_user = user.id_user;
                for (const prestation of this.getAllPrestation) {
                  if (prestation.id_stand === id_stand) {
                    await this.deletePrestationStore(prestation.id_prestation);
                  }
                }
                await this.deleteStandStore(id_stand);
                await this.deleteUserStore(id_user);
              } catch (error) {
                console.error('Error during user deletion:', error);
              }
            }
            else{
              window.alert("Cette données est liée à d'autres")
              if (this.$route.name !== 'AdminDeleteCascadeProtector') {
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
              }else{
                this.$emit('NeedProtection', {dataProp: user, dataType: 'user'});
              }
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
              if(this.$route.name !== 'AdminRoles' && this.isProtectorDelete){
                if(this.filteredProtector.length === 0){
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