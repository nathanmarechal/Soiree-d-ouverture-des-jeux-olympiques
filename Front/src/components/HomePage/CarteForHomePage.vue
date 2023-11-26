<template>
  <div class="container-fluid h-100 " >
    <div class="row h-100">
      <h2 class="subtitle subMarge">Une cérémonie sur l'eau</h2>
      <div class="col-lg-4 d-flex align-items-center justify-content-center">
        <p class="lead test justi">{{ CarteDescription }}</p>
      </div>
      <div class="col-lg-8 d-flex align-items-center justify-content-center">
        <MapZone style="width: 75%; height: 100%" />
      </div>
    </div>
  </div>
</template>


<script>
import MapZone from '../Map/MapZone.vue'

export default {
  data() {
    return {
      CarteDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit sem eget dui blandit, eget ullamcorper odio interdum. Sed vel nunc ac sapien facilisis ultricies. Sed luctus nunc non dolor semper, non mattis felis bibendum. Nunc vitae ante eget tortor aliquet consectetur. Aliquam erat volutpat. Duis vel hendrerit lorem. Nullam aliquet felis eu nulla mattis, eget vehicula tortor ultricies. Aenean varius purus nec mauris tincidunt, non pharetra felis fringilla. Maecenas mattis consectetur mi, nec sollicitudin ipsum euismod a. Nullam in luctus nisl. Integer auctor, odio eget iaculis facilisis, lectus justo malesuada nisl, sed posuere metus neque nec nisi. Sed venenatis, libero in venenatis malesuada, nulla ligula aliquet nulla, vel consectetur tortor dolor nec justo. Vestibulum consequat elit ac tortor interdum, a consectetur sapien varius. Vivamus interdum, justo in tincidunt faucibus, urna ex viverra arcu, sit amet mattis libero turpis vel sapien"
    };
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