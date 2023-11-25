<template>
  <div class="margeS">
    <div v-if="getProvenance!=0" >
    <filterByTypeComponent></filterByTypeComponent>
    </div>
    <div v-if="getProvenance!=1">
    <filter-by-stand></filter-by-stand>
    </div>
    <shopcomponent></shopcomponent>
  </div>
</template>


<script>

import shopcomponent from '../components/ShopPage/ShopComponent.vue'
import filterByTypeComponent from "@/components/ShopPage/FilterByTypeComponent.vue";
import filterByStand from "@/components/ShopPage/FilterByStand.vue";
import {mapGetters, mapMutations} from "vuex";
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
  },
  computed: {
    ...mapGetters(['getProvenance']),
    ...mapMutations(['SET_PROVENANCE', "SET_SELECTED_TYPE_PRESTATION", "SET_SELECTED_STANDS"]),
  },
}
</script>

<style scoped>
.margeS{
  margin-bottom: 5%;
  margin-top: 6%;
}
</style>
