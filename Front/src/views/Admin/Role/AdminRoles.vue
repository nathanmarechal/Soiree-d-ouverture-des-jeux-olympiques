<template>
    <div class="main">
      <router-link to="/admin/roles/add" class="btn btn-success">{{translate("roleAdd")}}</router-link>
      <role-list></role-list>      
    </div>
  </template>
  
  <script>
  import RoleList from '@/components/Admin/Role/RoleList.vue';
  import {translate} from "@/lang/translationService";
  
  export default {
    methods: {translate},
    components: {
      RoleList,
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
  