<template>
    <div>
      <div v-if="true">
      <div class="main" style="margin-top: 10vh;  width: 100%;">
          <add-user-form ></add-user-form>
      </div>
      </div>
    <div v-else>
      {{ error404() }}
    </div>
    </div>
  </template>
  
  <script>
  import AddUserForm from '@/components/Admin/User/AddUserForm.vue';
    
  export default {
    components: {
        AddUserForm,
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
  display: flex;
  justify-content: center;
}
  </style>