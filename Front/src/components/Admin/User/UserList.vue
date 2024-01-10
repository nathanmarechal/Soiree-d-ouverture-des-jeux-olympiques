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
              <router-link v-if="!isProtectorDelete" :to="{ name: 'AdminEditUsers', params: { selected_user: user } }" class="btn btn-primary">{{translate("userList_5")}}</router-link>
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
      //...mapGetters(['getAllUsers', 'getAllRoles','getCurrentUser', 'getAllPrestation', 'getAllStand']),
      ...mapGetters('roleEtDroit', ['getAllRoles']),
      ...mapGetters('user', ['getCurrentUser','getAllUsers']),
      ...mapGetters('prestationEtType', ['getAllPrestation']),
      ...mapGetters('stands' , ['getAllStand']),
      filteredProtector: function(){
        // verify that the data in filterProtector is still in the getAllUsers so for each data in filterProtector, check if it is in getAllUsers or else remove it from filterProtector
        if (this.filterProtector != null){
          const filteredProtector = this.filterProtector.filter(data => this.getAllUsers.find(user => user.id_user === data.id_user));
          return filteredProtector;}
        return null;
      }
    },
    methods: {
      translate,
      //...mapActions(['getUsersStore', 'deleteUserStore', 'getRolesStore', 'getPrestationsStore', 'getStandsStore', 'deletePrestationStore', 'deleteStandStore']),
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
        //console.log("removing a user my zizi")
        const connectedUser = this.getCurrentUser;
        if (connectedUser.id_user === id_user) {
          window.alert(this.translate("userList_7"));
          return;
        }
        const user = this.getAllUsers.find(user => user.id_user === id_user)
        console.log("user", user);
        const confirmMessage = `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.prenom} ${user.nom} ?`;
        console.log("OUUUAIIIIS remove user")
        if (noMessage || confirm(confirmMessage)) {
          console.log("user before ifhasstand", user);
          const ifHasStand = user.id_stand !== null;
          console.log("ifHasStand", ifHasStand);
          if (ifHasStand) {
            if(force){
              try {
                console.log("delete *", user.id_stand, user.id_user, user);
                const id_stand = user.id_stand;
                const id_user = user.id_user;
                for (const prestation of this.getAllPrestation) {
                  if (prestation.id_stand === id_stand) {
                    console.log("delete prestation", prestation.id_prestation);
                    await this.deletePrestationStore(prestation.id_prestation);
                  }
                }
                await this.deleteStandStore(id_stand);
                console.log("about to delete user store")
                await this.deleteUserStore(id_user);
              } catch (error) {
                console.error('Error during user deletion:', error);
              }
            }
            else{
              window.alert('ALERTEALERTeALERT')
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
              console.log("delete user");
             await this.deleteUserStore(user.id_user);
            } catch (error) {
             console.error('Erreur lors de la suppression de l\'utilisateur :', error);
              }
            }
          }
          console.log("this.$route.name", this.$route.name);
              if(this.$route.name !== 'AdminRoles' && this.isProtectorDelete){
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
              console.log("filteredProtector", this.filteredProtector);
              this.filteredProtector.forEach(async user => {
                console.log("user", user, user.id_user);
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