<template>
  <div class="main">
    <router-link to="/prestataire/prestations/add" class="btn btn-success">Ajouter une prestation</router-link>
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>