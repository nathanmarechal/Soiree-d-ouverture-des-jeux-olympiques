<template>

  <div class="d-flex align-items-center justify-content-center" style="margin-top: 8vh;">
    <div class="card">
      <div id="map" style="width: 1000px; height: 1000px;"></div>
    </div>
    <div>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">Terrain non reserve</label>
      </div>



    </div>
  </div>

</template>

<script>
import L from 'leaflet';

export default {
  mounted() {
    var data = [[[]]]; // Make sure your data array is correctly formatted

    // Initialize the map
    var map = L.map('map').setView([48.8525021, 2.3052606], 15);

    // Define the OpenStreetMap tile provider
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add polygons to the map
    for (var i = 0; i < data.length; i++) {
        L.polygon(data[i], {color: 'green'}).addTo(map);
    }
  } // This closing bracket was missing
}; // This closing bracket was missing
</script>


<style scoped>
.d-flex {
  margin-top: 5vh;
}
</style>
