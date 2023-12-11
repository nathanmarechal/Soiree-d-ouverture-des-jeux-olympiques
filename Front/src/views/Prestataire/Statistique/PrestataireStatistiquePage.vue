<template>
  <div class="main">
    <prestataire-show-statistique></prestataire-show-statistique>
  </div>

</template>


<script>

import prestataireShowStatistique from '@/components/Prestataire/Statistiques/PrestataireShowStatistique.vue'

export default {
  components: {
    prestataireShowStatistique
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