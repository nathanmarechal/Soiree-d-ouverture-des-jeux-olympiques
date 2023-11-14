<template>
  <div class="margeS">
    <filterByTypeComponent></filterByTypeComponent>
    <shopcomponent></shopcomponent>
  </div>
</template>


<script>

import shopcomponent from '../components/ShopComponent.vue'
import filterByTypeComponent from "@/components/FilterByTypeComponent.vue";
export default {
  components: {
    filterByTypeComponent,
    shopcomponent,
  }
}
</script>

<style scoped>
.margeS{
  margin-bottom: 5%;
  margin-top: 6%;
}
</style>
