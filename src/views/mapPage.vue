<template>
  <div class="container">
    <MapZone :areas="areas_json" />
    <FilterMap :type_prestations="type_prestations" :zones="zones" />
  </div>
</template>

<script>
import MapZone from "@/components/Map/MapZone.vue";
import FilterMap from "@/components/Map/FilterMap.vue";
import zones_json from "../datasources/zones.json"
import type_prestation_json from "../datasources/type_prestation.json"
import areas_json from "../datasources/areas.json"

export default {
  components: {
    MapZone,
    FilterMap
  },
  data() {
    return {
      showZoneList: null,
      showPrestationList: null,
      zones: zones_json.zone,
      type_prestations: type_prestation_json.type_prestation,
      areas_json: areas_json.areas
    };
  }
}
</script>

<style>
.container {
  margin-top: 8vh;
  display: flex;
  flex-direction: row;
}
</style>
