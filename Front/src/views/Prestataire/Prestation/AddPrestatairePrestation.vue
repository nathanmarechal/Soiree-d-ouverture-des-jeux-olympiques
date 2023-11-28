<template>
  <div class="main" style="margin-top: 10vh;  width: 100%;">
    <add-prestation></add-prestation>
  </div>
</template>


<script>
import addPrestation from '@/components/Prestataire/Prestation/AddPrestationPrestataire.vue'


export default {
  components: {
    addPrestation
  }
}
</script>

<style scoped>

.main{
  display: flex;
  justify-content: center;
}

</style>