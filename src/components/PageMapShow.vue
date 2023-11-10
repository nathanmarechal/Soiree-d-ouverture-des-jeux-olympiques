<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <div class="card">
          <div id="map" style="width: 100%; height: 600px;"></div>
        </div>
      </div>
      <div class="col-lg-4">
        <h3>Filtre</h3>

        <h4>Prix</h4>

        <label for="minPrice">Prix minimum :</label>
        <input type="number" id="minPrice" v-model="minPrice" min="0">

        <label for="maxPrice">Prix maximum :</label>
        <input type="number" id="maxPrice" v-model="maxPrice" min="0">

        <p>Plage de prix : {{ minPrice }} € - {{ maxPrice }} €</p>

        <h4>Entreprise</h4>
        <div class="form-outline">
          <input type="search" id="form1" class="form-control" placeholder="Chercher entreprise" aria-label="Search"/>
        </div>

        <h4>Zone</h4>
        <div v-for="(zone, index) in zones" :key="index" class="form-check">
          <input class="form-check-input" type="checkbox" :id="'zoneCheck' + index" v-model="selectedZones" :value="zone.libelle">
          <label class="form-check-label" :for="'zoneCheck' + index">{{ zone.libelle }}</label>
        </div>

        <h4>Type de prestation</h4>
        <div v-for="(type_prestation, index) in type_prestations" :key="index" class="form-check">
          <input class="form-check-input" type="checkbox" :id="'typePrestationCheck' + index" v-model="selectedTypePrestations" :value="type_prestation.libelle">
          <label class="form-check-label" :for="'typePrestationCheck' + index">{{ type_prestation.libelle }}</label>
        </div>
      </div>
    </div>
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
  data() {
    return {
      minPrice: 0,
      maxPrice: 100,
      selectedZones: [],
      selectedTypePrestations: []
    };
  },
  mounted() {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Vous pouvez ajouter des marqueurs ou des formes sur la carte ici si nécessaire
  }
};
</script>

<style scoped>
.container {
  margin-top: 8vh;
}
</style>
