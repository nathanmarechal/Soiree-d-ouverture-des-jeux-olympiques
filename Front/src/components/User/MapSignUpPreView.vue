<template>
  <div>
    <div class="map-container">
      <div class="map" id="map-preview"></div>
    </div>
  </div>
</template>


<script>
import L from 'leaflet';
import {mapActions, mapState} from 'vuex';


export default {

  data() {
    return {
      map: null,
      selectedStand: null,
      polygons: [],
      modalActive: false

    };
  },
  async mounted() {
    try {
      await this.$store.dispatch('getAreas');
      this.initializeMap(); // Appelez initializeMap() après avoir attendu le chargement des données
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapState(['areas', 'zones']),
  },
  methods: {

    ...mapActions(['getAreas', 'getZones']),

    initializeMap() {
      console.log('initalized')
      // Initialise la carte Leaflet avec une vue par défaut
      this.map = L.map('map-preview').setView([48.859024, 2.329182], 14);

      // Ajoute une couche de tuiles OpenStreetMap à la carte
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      const areas = this.areas

      const filteredAreas = areas.filter(zone => {
        return (zone.isfree === true)
      });
      filteredAreas.forEach(zone => {
        const polygon = L.polygon(zone.coordinates, {
          color: 'blue',
          fillOpacity: 0.8,
        }).addTo(this.map);

        this.polygons.push(polygon);
      });
    }
  }
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
.map {
  width: 100%;
  height: 100%;
}
</style>
