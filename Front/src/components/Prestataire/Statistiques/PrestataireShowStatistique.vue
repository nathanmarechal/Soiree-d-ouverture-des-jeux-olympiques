<template>
  <div class="d-flex flex-column gap-3">
    <div class="d-flex flex-row justify-content-center">
      <prestation-by-hours></prestation-by-hours>
      <prestation-sales-revnue-by-type></prestation-sales-revnue-by-type>
    </div>
    <prestataire-stats-box></prestataire-stats-box>
  </div>
</template>

<script>

import PrestationByHours from "@/components/Prestataire/Statistiques/PrestationByHours.vue";
import PrestationSalesRevnueByType from "@/components/Prestataire/Statistiques/PrestationSalesRevnueByType.vue";
import PrestataireStatsBox from "@/components/Prestataire/Statistiques/PrestataireStatsBox.vue";
export default {
  components: {
    PrestationByHours,
    PrestationSalesRevnueByType,
    PrestataireStatsBox
  }
}
</script>