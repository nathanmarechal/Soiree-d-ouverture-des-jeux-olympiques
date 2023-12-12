<template>
  <div class="d-flex flex-column">
    <prestation-by-hours></prestation-by-hours>
  </div>
</template>

<script>

import PrestationByHours from "@/components/Prestataire/Statistiques/PrestationByHours.vue";
export default {
  components: {
    PrestationByHours
  }
}
</script>