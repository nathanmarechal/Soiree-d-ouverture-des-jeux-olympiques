<template>
    <div>
      <div v-if="this.checkIfUserHasRight('see_users')" class="main">
          <router-link to="/admin/users/add" class="btn btn-success">{{translate("adminUser_1")}}</router-link>
          <user-list></user-list>
      </div>
    <div v-else>
      {{ error404() }}
    </div>
    </div>
  </template>
  
  <script>
  import UserList from '@/components/Admin/User/UserList.vue';
  import {translate} from "../../../lang/translationService";
  import {mapActions} from "vuex";

  export default {
      components: {
          UserList
      },
      methods: {
        ...mapActions('user',['checkIfUserHasRight']),
        translate,
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