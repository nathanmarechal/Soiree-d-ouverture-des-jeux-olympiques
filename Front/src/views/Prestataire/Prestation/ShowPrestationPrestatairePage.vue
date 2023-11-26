<template>
  <div class="main">
    <show-prestation-prestataire></show-prestation-prestataire>
  </div>
</template>

<script>

import showPrestationPrestataire from '@/components/Prestataire/Prestation/ShowPrestationPrestataire.vue'
export default {
  components: {
    showPrestationPrestataire
  }
}
</script>

<style scoped>

.main{
  margin-top: 15vh;
  display: flex;
  justify-content: center
;
}


</style>