<template>
    <div class="main" style="margin-top: 10vh;  width: 100%;">
        <delete-cascade-protector :dataProp="this.$route.params.dataProp" :dataType="this.$route.params.dataType"></delete-cascade-protector>
    </div>
  </template>
  
  
  <script>
  import deleteCascadeProtector from '@/components/Admin/DeleteCascadeProtector/DeleteCascadeProtector.vue'
  
  
  export default {
    components: {
      deleteCascadeProtector
    }
  }
  </script>
  
  <style scoped>
  
  .main{
    display: flex;
    justify-content: center;
  }
  
  </style>