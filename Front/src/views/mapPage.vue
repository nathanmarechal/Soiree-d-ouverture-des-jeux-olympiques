
<template>
  <div class="d-flex justify-content-center">
    <div class="filter-map d-flex flex-column gap-3 justify-content-center">
      <div class="d-flex flex-row gap-3 justify-content-between" style="border: red solid; height: 100%;">
        <FilterMap style="width: 20%"/>
        <MapZone style="width: 75%; height: 100%"/>
      </div>
    </div>

  </div>

</template>

<script>
import MapZone from "@/components/Map/MapZone.vue";
import FilterMap from "@/components/Map/FilterMap.vue";

export default {
  components: {
    MapZone,
    FilterMap
  }
}

</script>

<style scoped>

.filter-map{
  width: 90%;
  margin-top: 10vh;
  height: 80vh;
}


</style>
