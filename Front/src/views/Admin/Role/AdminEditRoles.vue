<template>
    <div class="main">
      <edit-role-form :selected_role="this.$route.params.selected_role"></edit-role-form>
    </div>
  </template>
  
  <script>
  import EditRoleForm from '@/components/Admin/Role/EditRoleForm.vue';
  
  export default {
    components: {
      EditRoleForm,
    },
  };
  </script>
  
  <style scoped>
  .main{
   display: flex;
   justify-content: center;
   margin-top: 10vh;
   margin-bottom: 5vh;
  }
  </style>
  