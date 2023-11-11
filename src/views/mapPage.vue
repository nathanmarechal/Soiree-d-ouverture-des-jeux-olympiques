
<template>
  <div class="container">
    <div class="d-flex flex-column gap-3 justify-content-center">
      <div class="d-flex flex-row gap-3 justify-content-center" style="height: 50vh;">
        <FilterMap :type_prestations="type_prestations" :zones="zones" />
        <MapZone :areas="areas" />
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
.container {
  margin-top: 8vh;
  display: flex;
  flex-direction: row;
}
</style>
