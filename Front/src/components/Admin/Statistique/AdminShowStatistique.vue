<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-row justify-content-center">
      <best-seller-prestation></best-seller-prestation>
      <new-stand-by-mounth></new-stand-by-mounth>
    </div>
    <StatsBox></StatsBox>
  </div>
</template>

<script>
import bestSellerPrestation from './BestSellerPrestation.vue'
import newStandByMounth from './NewStandByMounth.vue'
import StatsBox from "@/components/Admin/Statistique/StatsBox.vue";
export default {
  components: {
    bestSellerPrestation,
    newStandByMounth,
    StatsBox
  }
}
</script>