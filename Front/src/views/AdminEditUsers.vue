<template>
    <div class="container" style="margin-top: 70px;">
        <h1 class="title">Liste d'utilisateurs :</h1>
        <button v-if="showAddButton" class="blue-button" @click="showAddForm">Ajouter utilisateurs</button> <br><br>
        <user-list v-if="showUserList" :users="users" :filtered-users="filteredUsers" @edit-user="editUser" @delete-user="deleteUser"></user-list>
        <add-user-form v-if="showAddUserForm" :users="users" @add-user="addUser" @close="closeAddForm"></add-user-form>
        <edit-user-form v-if="showEditUserForm" :user="selectedUser" @update-user="updateUser" @close="closeEditForm"></edit-user-form>
    </div>
</template>

<script>
import UserList from '../components/Admin/UserList.vue';
import AddUserForm from '../components/Admin/AddUserForm.vue';
import EditUserForm from '../components/Admin/EditUserForm.vue';


import {mapActions, mapState} from 'vuex'
//import {getAllUsers} from "@/services/utilisateur.service";

export default {
    components: {
        UserList,
        AddUserForm,
        EditUserForm
    },
    data() {
        return {
            //users: dataTest.users,
            //users: [],
            filterRole: '',
            showAddUserForm: false,
            showEditUserForm: false,
            showUserList: true,
            showAddButton: true,
            selectedUser: null,
        };
    },

    created() {
      this.$store.dispatch('getUsers')
    },

    computed: {

      ...mapState(['users']),

      filteredUsers() {
          if (this.filterRole === '') {
              return this.users;
          } else {
              return this.users.filter(user => user.role === this.filterRole);
          }
      },
    },
    methods: {

        ...mapActions(['getUsers']),

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
