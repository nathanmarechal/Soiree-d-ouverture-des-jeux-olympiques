<template>
  <div class="container-fluid h-100" style="font-family: Arial, sans-serif" >
    <div class="row h-100">
      <h2 class="subtitle subMarge" style="padding-left: 3%">{{translate("map_1")}}</h2>
      <div class="col-lg-4 d-flex align-items-center justify-content-center">
        <PageDescription :id="2"/>
      </div>
      <div class="col-lg-8 d-flex align-items-center justify-content-center">
        <MapZone style="width: 75%; height: 100%" />
      </div>
    </div>
  </div>
</template>


<script>
import MapZone from '../Map/MapZone.vue'
import {translate} from "../../lang/translationService";
import PageDescription from "@/components/HomePage/PageDescription.vue";

export default {
  methods: {translate},
  components: {
    PageDescription,
    MapZone
  }


};
</script>

<style scoped>

.subMarge {
  margin-top: 4vh;
}

.customarge {
  margin-top: 10vh;
  margin-bottom: 10vh;
  margin-left: 5vh;
}
.justi{
  text-align: justify;
}

.map-container {
  width: 95%;
  height: 95%;
}
#map {
  width: 95%;
  height: 95%;
}

</style>