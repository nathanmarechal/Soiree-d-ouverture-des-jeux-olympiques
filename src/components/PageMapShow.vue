<template>

  <div class=" col-lg-8 d-flex align-items-center justify-content-center" style="margin-top: 8vh;">
    <div class="card">
      <div id="map" style="width: 1000px; height: 1000px;"></div>
    </div>
    <div>
    </div>
  </div>
  <h3>Filtre </h3>

  <h4>Prix</h4>

  <label for="minPrice">Prix minimum :</label>
  <input type="number" id="minPrice" v-model="minPrice" min="0">

  <label for="maxPrice">Prix maximum :</label>
  <input type="number" id="maxPrice" v-model="maxPrice" min="0">

  <p>Plage de prix : {{ minPrice }} € - {{ maxPrice }} €</p>


  <h4>Entreprise</h4>
  <div class="form-outline">
    <input type="search" id="form1" class="form-control" placeholder="chercher entreprise" aria-label="Search"/>
  </div>

  <h4>Zone</h4>
  <div v-for="(zone, index) in zones" :key="index" class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
    <label class="form-check-label" for="defaultCheck1"> {{ zone.libelle }}</label>
  </div>

  <h4>Type de prestation</h4>

  <div v-for="(type_prestation, index) in type_prestations" :key="index" class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
    <label class="form-check-label" for="defaultCheck1"> {{ type_prestation.libelle }}</label>
  </div>


</template>

<script>
import L from 'leaflet';

export default {
  props: {
    zones: {
      type: Array,
      required: true
    },
    type_prestations: {
      type: Array,
      required: true
    }
  },
  mounted() {
    const map = L.map('map').setView([51.505, -0.09], 13); // Coordonnées de la carte et niveau de zoom initial

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Vous pouvez ajouter des marqueurs ou des formes sur la carte ici si nécessaire
  }
};
</script>

<style scoped>
.d-flex {
  margin-top: 5vh;
}
</style>