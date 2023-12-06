<template>
  <div class="container-fluid h-100" style="font-family: Arial, sans-serif" >
    <div class="row h-100">
      <h2 class="subtitle subMarge" style="padding-left: 3%">{{translate("map_1")}}</h2>
      <div class="col-lg-4 d-flex align-items-center justify-content-center">
        <div class="lead test justi" style="margin-left: 7%">{{ translate("map_2") }}
        <ul class="lead test justi" >
          <li style="margin-top: 1%">{{translate("map_3")}}<b style="font-weight: bold">{{translate("map_4")}}</b>{{translate("map_4.5")}}</li>
          <li style="margin-top: 1%">{{translate("map_5")}}<b style="font-weight: bold">{{translate("map_6")}}</b>{{translate("map_7")}}</li>
          <li style="margin-top: 1%">{{translate("map_8")}}<b style="font-weight: bold">{{translate("map_9")}}</b>{{translate("map_10")}}</li>
          <li style="margin-top: 1%">{{translate("map_11")}}<b style="font-weight: bold">{{translate("map_12")}}</b>{{translate("map_13")}}</li>
          <li style="margin-top: 1%">{{translate("map_14")}}<b style="font-weight: bold">{{translate("map_15")}}</b> !</li>
          <li style="margin-top: 1%">{{translate("map_16")}}<b style="font-weight: bold">{{translate("map_17")}}</b>{{translate("map_18")}}</li>
          <li style="margin-top: 1%">{{translate("map_19")}}<b style="font-weight: bold">{{translate("map_20")}}</b>{{translate("map_21")}}</li>
        </ul>
        </div>
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

export default {
  methods: {translate},
  data() {
  },
  components: {
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