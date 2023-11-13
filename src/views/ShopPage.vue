<template>
  <div class="margeS">
    <shopcomponent></shopcomponent>
  </div>
</template>


<script>

import shopcomponent from '../components/ShopComponent.vue'
export default {
  components: {
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
