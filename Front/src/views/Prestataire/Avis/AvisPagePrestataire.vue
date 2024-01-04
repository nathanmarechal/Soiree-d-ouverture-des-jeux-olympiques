<template>
<div class="main">
  <avis-prestataires></avis-prestataires>
</div>
</template>


<script>
import avisPrestataires from "@/components/Prestataire/Avis/AvisPrestataires.vue";

export default {
  components: {
    avisPrestataires,
  },
}


</script>


<style scoped>

.main{
  margin-top: 10vh;
}
</style>