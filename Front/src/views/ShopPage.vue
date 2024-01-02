<template>
  <div style="margin-top: 8%">
  <div v-if="getProvenance === 1">
    <StandShopComponent></StandShopComponent>
  </div>
  <div v-if="getProvenance === 0">
    <TypePrestaShopComponent></TypePrestaShopComponent>
  </div>
  <div class="main" style="margin-top: 2%">
    <div class="search">
      <div v-if="getProvenance !== 0">
        <filterByTypeComponent></filterByTypeComponent>
      </div>
      <div v-if="getProvenance !== 1">
        <filter-by-stand></filter-by-stand>
      </div>
    </div>
    <div class="prestation">
      <shopcomponent></shopcomponent>
    </div>
  </div>
    <div v-if="getProvenance === 1">
      <avisComponent></avisComponent>
    </div>
  </div>
</template>


<script>

import shopcomponent from '../components/ShopPage/ShopComponent.vue'
import filterByTypeComponent from "@/components/ShopPage/FilterByTypeComponent.vue";
import filterByStand from "@/components/ShopPage/FilterByStand.vue";
import StandShopComponent from "@/components/ShopPage/StandShopComponent.vue";
import TypePrestaShopComponent from "@/components/ShopPage/TypePrestaShopComponent.vue";
import AvisComponent from "@/components/AvisComponent.vue";
import {mapGetters} from "vuex";
//import {mapGetters, mapMutations} from "vuex";
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
    TypePrestaShopComponent,
    filterByTypeComponent,
    StandShopComponent,
    shopcomponent,
    filterByStand,
    avisComponent: AvisComponent,
  },

  computed: {
    ...mapGetters(['getProvenance']),
  },


}
</script>

<style scoped>
.main {
  //margin-top: 10vh;
  margin-bottom: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.prestation {
  width: 80%;
  display: flex;
  justify-content: flex-start;
}

.search {
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2vh;
}

</style>