<template>
    <div class="main" style="margin-top: 10vh;  width: 100%;">
      <add-role-form></add-role-form>
    </div>
  </template>
  
  <script>
  import AddRoleForm from '@/components/Admin/Role/AddRoleForm.vue';
  
  export default {
    components: {
      AddRoleForm,
    },
  };
  </script>

  <style scoped>
  
  .main{
  display: flex;
  justify-content: center;
  }
  </style>
  