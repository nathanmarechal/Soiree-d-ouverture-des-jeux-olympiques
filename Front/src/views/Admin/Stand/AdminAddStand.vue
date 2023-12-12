<template>
    <div>
      <div v-if="true">
      <div class="main" style="margin-top: 10vh;  width: 100%;">
          <add-stand-form ></add-stand-form>
      </div>
      </div>
    <div v-else>
      {{ error404() }}
    </div>
    </div>
  </template>
  
  <script>
  import AddStandForm from '@/components/Admin/Stand/AddStandForm.vue';
    
  export default {
    components: {
        AddStandForm,
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