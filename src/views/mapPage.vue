
<template>
  <div class="d-flex justify-content-center">
    <div class="filter-map d-flex flex-column gap-3 justify-content-center">
      <div class="d-flex flex-row gap-3 justify-content-between" style="border: red solid; height: 50vh;">
        <FilterMap :type_prestations="type_prestations" :zones="zones" style="width: 20%"/>
        <MapZone :areas="areas" style="width: 75%; height: 100%"/>
      </div>

      <CardPrestation :prestations="prestation"></CardPrestation>
    </div>

  </div>

</template>

<script>
import MapZone from "@/components/Map/MapZone.vue";
import FilterMap from "@/components/Map/FilterMap.vue";
import CardPrestation from "@/components/Map/CardPrestation.vue";
import zones_json from "../datasources/zones.json"
import type_prestation_json from "../datasources/type_prestation.json"
import areas_json from "../datasources/areas.json"
import prestation_json from "../datasources/prestation.json"

export default {
  components: {
    MapZone,
    FilterMap,
    CardPrestation
  },
  data() {
    return {
      showZoneList: null,
      showPrestationList: null,
      zones: zones_json.zone,
      type_prestations: type_prestation_json.type_prestation,
      areas: areas_json.areas,
      prestation: prestation_json.prestation
    };
  }
}
</script>

<style scoped>

.filter-map{
  width: 90%;
  margin-top: 10vh;
}

</style>
