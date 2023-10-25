<template>
        <div class="container">
            <h1 class="title">User List :</h1>
            <button v-if="showAddButton" class="blue-button" @click="showAddUserForm = true, showUserList = false, showAddButton = false">Add User</button> <br><br>
            <user-list v-if="showUserList" :users="users" :filtered-users="filteredUsers" @edit-user="editUser" @delete-user="deleteUser"></user-list>
            <add-user-form v-if="showAddUserForm" :users="users" @add-user="addUser,showAddUserForm = false , showUserList = true, showAddButton = true" @close="showAddUserForm = false, showUserList = true, showAddButton = true"></add-user-form>
        </div>
    </template>
    
    <script>
    import UserList from '../components/UserList.vue';
    import AddUserForm from '../components/AddUserForm.vue';
    import dataTest from "../datasources/testUsers.json";
    
    export default {
        components: {
            UserList,
            AddUserForm,
        },
        data() {
            return {
                users: dataTest.users,
                filterRole: '',
                showAddUserForm: false,
                showUserList: true,
                showAddButton: true,
            };
        },
        computed: {
            filteredUsers() {
                if (this.filterRole === '') {
                    return this.users;
                } else {
                    return this.users.filter(user => user.role === this.filterRole);
                }
            },
        },
        methods: {
            addUser(user) {
                this.users.push(user);
                this.showAddUserForm = false;
            },
            editUser(index) {
                console.log('edit user', index);
            },
            deleteUser(index) {
                this.users.splice(index, 1);
                console.log('delete user', index);
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
    }    </style>

