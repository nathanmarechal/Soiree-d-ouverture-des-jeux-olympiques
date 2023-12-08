<template>
  <div class="main">
    <edit-prestation-prestataire  :selected_prestation="this.$route.params.selected_zone"></edit-prestation-prestataire>
  </div>
</template>

<script>

import editPrestationPrestataire from '@/components/Prestataire/Prestation/EditPrestationPrestataire.vue'
export default {
  components: {
    editPrestationPrestataire
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