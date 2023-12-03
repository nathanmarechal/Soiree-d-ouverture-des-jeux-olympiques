<template>
  <div class="d-flex flex-column">
  <best-seller-prestation></best-seller-prestation>
  <new-stand-by-mounth></new-stand-by-mounth>
  </div>
</template>

<script>
import bestSellerPrestation from './BestSellerPrestation.vue'
import newStandByMounth from './NewStandByMounth.vue'
export default {
  components: {
    bestSellerPrestation,
    newStandByMounth
  }
}
</script>