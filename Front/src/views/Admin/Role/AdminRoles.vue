<template>
    <div class="main">
      <router-link to="/admin/roles/add" class="btn btn-success">Ajouter un rôle</router-link>
      <role-list></role-list>      
    </div>
  </template>
  
  <script>
  import RoleList from '@/components/Admin/Role/RoleList.vue';
  
  export default {
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
  