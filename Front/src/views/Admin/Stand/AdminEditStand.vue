<template>
    <div>
      <div v-if="true">
      <div class="main" style="margin-top: 10vh;  width: 100%;">
          <edit-stand-form :selected_stand="this.$route.params.selected_stand" ></edit-stand-form>
      </div>
      </div>
    <div v-else>
      {{ error404() }}
    </div>
    </div>
  </template>
  
  <script>
  import EditStandForm from '@/components/Admin/Stand/EditStandForm.vue';
    
  export default {
    components: {
        EditStandForm,
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