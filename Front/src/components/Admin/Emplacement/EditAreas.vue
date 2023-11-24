<template>
    <div class="map-container">
      <div id="map"></div>
    </div>
</template>

<script>
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import 'leaflet-draw';

import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      map: null,
      polygons: [],
      modalActive: false,
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch('getAreas');
      await this.$store.dispatch('getZones');
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
      console.log('initialized');
      // Initialize the Leaflet map with a default view
      this.map = L.map('map').setView([48.859024, 2.329182], 14);

      // Add an OpenStreetMap tile layer to the map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      // Initialize the drawing control
      const drawControl = new L.Control.Draw({
        draw: {
          polygon: true,
          polyline: false,
          rectangle: false,
          circle: false,
          marker: false,
        },
      });

      // Add the drawing control to the map
      this.map.addControl(drawControl);

      // Handle draw events
      this.map.on('draw:created', (event) => {
        const layer = event.layer;
        this.addZone(layer.getLatLngs());
      });

      this.updateMap();
    },

    addZone(coordinates) {
      alert(coordinates);
    },
    updateMap() {
      console.log('updateMAP');
      // Supprimez les polygones actuels de la carte
      this.polygons.forEach((polygon) => {
        this.map.removeLayer(polygon);
      });

      const areas = this.areas;
      // Ajoutez à nouveau les polygones filtrés à la carte
      areas.forEach((zone) => {
        const polygon = L.polygon(zone.coordinates, {
          color: zone.couleur_hexa,
          fillOpacity: 0.9,
        }).addTo(this.map);

        polygon.on('click', () => {
          this.showZoneInfo(zone);
        });

        this.polygons.push(polygon);
      });
    },
    toggleModal() {
      this.modalActive = !this.modalActive;
      if (!this.modalActive) {
        this.selectedStand = null; // Réinitialisez lors de la fermeture de la modal
      }
    },
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
#map {
  width: 100%;
  height: 100%;
}
</style>
