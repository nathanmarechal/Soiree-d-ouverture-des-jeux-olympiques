<template>
  <div class="margeS">
    <filterByTypeComponent></filterByTypeComponent>
    <filter-by-stand></filter-by-stand>
    <shopcomponent></shopcomponent>
  </div>
</template>


<script>

import shopcomponent from '../components/ShopPage/ShopComponent.vue'
import filterByTypeComponent from "@/components/ShopPage/FilterByTypeComponent.vue";
import filterByStand from "@/components/ShopPage/FilterByStand.vue";
export default {
  components: {
    filterByTypeComponent,
    shopcomponent,
    filterByStand,
  }
}
</script>

<style scoped>
.margeS{
  margin-bottom: 5%;
  margin-top: 6%;
}
</style>
