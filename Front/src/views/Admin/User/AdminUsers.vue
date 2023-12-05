<template>
    <div>
      <div v-if="true" class="main">
          <router-link to="/admin/users/add" class="btn btn-success">Ajouter un utilisateur</router-link>
          <user-list></user-list>
      </div>
    <div v-else>
      {{ error404() }}
    </div>
    </div>
  </template>
  
  <script>
  import UserList from '@/components/Admin/User/UserList.vue';

  export default {
      components: {
          UserList
      },
      methods: {
      error404() {
        this.$router.push("/404");
      },
    }
  }
  </script>
  
  <style scoped>
    .main{
        margin-top: 15vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }  
  </style>