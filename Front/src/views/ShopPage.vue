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
  /*
  async mounted() {
    try {
      //await this.$store.dispatch('getTypePrestations');
      //await this.$store.dispatch('getStands');
      //await this.$store.dispatch('getPrestations');

    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
   */
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
