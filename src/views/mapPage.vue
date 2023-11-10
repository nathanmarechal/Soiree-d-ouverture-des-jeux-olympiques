<template>
  <div class="carte">
    <PageMapShow :zones="zones" :type_prestations="type_prestations"></PageMapShow>
  </div>
</template>

<script>

import PageMapShow from "@/components/PageMapShow.vue";
import zones_json from "../datasources/zones.json"
import type_prestation_json from "../datasources/type_prestation.json"

export default {
  components: {
    PageMapShow
  },
  data(){
    return{
      showZoneList: null,
      showPrestationList: null,
      zones: zones_json.zone,
      type_prestations: type_prestation_json.type_prestation
    }
  }
}
</script>

<style>
.carte{
  margin-top: 7%;
  margin-bottom: 5%;
}
</style>