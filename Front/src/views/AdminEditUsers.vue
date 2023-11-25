<template>
    <div class="container" style="margin-top: 70px;">
        <h1 class="title">Liste d'utilisateurs :</h1>
        <button v-if="showAddButton" class="blue-button" @click="showAddForm">Ajouter utilisateurs</button> <br><br>
        <user-list v-if="showUserList" :users="users" :filtered-users="filteredUsers" @edit-user="editUser" @delete-user="deleteUser"></user-list>
        <add-user-form v-if="showAddUserForm" :users="users" :roles="roles" :type-zone="typeZone" @add-user="addUser" @close="closeAddForm"></add-user-form>
        <edit-user-form v-if="showEditUserForm" :user="selectedUser" :roles="roles" :type-zone="typeZone" @update-user="updateUser" @close="closeEditForm"></edit-user-form>
    </div>
</template>

<script>
import UserList from '../components/Admin/User/UserList.vue';
import AddUserForm from '../components/User/AddUserForm.vue';
import EditUserForm from '../components/Admin/User/EditUserForm.vue';


//import {mapActions, mapState} from 'vuex'
import {mapActions} from 'vuex'
//import {getAllUsers} from "@/services/utilisateur.service";

export default {
    components: {
        UserList,
        AddUserForm,
        EditUserForm
    },
    data() {
        return {
          users: [], // Variable locale
          roles: [], // Variable locale
          //typeZone: [], // Variable locale

          filterRole: '',
          showAddUserForm: false,
          showEditUserForm: false,
          showUserList: true,
          showAddButton: true,
          selectedUser: null,
        };
    },

    async created() {
      try {
        this.users = await this.getUsers();
        this.roles = await this.getRoles();
        //this.typeZone = await this.getTypeZone();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    /*
    created() {
      this.loadUsers().then(() => {
        console.log('users loaded ' + this.users)
      })
      //this.$store.dispatch('getAllUsers')
      //this.$store.dispatch('getRoles');
      //this.$store.dispatch('getTypeZone');
    },
     */

    computed: {
      //...mapState(['users', 'roles', 'typeZone']),
      filteredUsers() {
          if (this.filterRole === '') {
              return this.users;
          } else {
              return this.users.filter(user => user.role === this.filterRole);
          }
      },
    },
    methods: {
      /*
      async loadUsers() {
        try {
          const response = await getAllUsers(); // Replace with your actual function to fetch users
          //console.log('response ' + response)
          this.users = response; // Assuming response.data holds your users
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },

       */

        ...mapActions(['getUsers']),
        ...mapActions(['getRoles']),
        //...mapActions(['getTypeZone']),

        addUser(user) {
            user.id = this.users.length + 1;
            this.users.push(user);
            this.closeAddForm();
        },
        deleteUser(index) {
            this.users.splice(index, 1);
            console.log('delete user', index);
        },
        editUser(index) {
        console.log('edit user', index);
        this.selectedUser = JSON.parse(JSON.stringify(this.users[index]));
        this.showEditUserForm = true;
        this.showUserList = false;
        this.showAddButton = false;
        },
        showAddForm() {
            this.showAddUserForm = true;
            this.showUserList = false;
            this.showAddButton = false;
        },
        closeAddForm() {
            this.showAddUserForm = false;
            this.showUserList = true;
            this.showAddButton = true;
        },
        closeEditForm() {
            this.showEditUserForm = false;
            this.showUserList = true;
            this.showAddButton = true;
        },
        updateUser(user) {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users.splice(index, 1, user);
        }
        this.closeEditForm();
        },
    },
};
</script>

<style scoped>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }
    
    .title {
        font-size: 36px;
        margin-bottom: 20px;
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
</style>