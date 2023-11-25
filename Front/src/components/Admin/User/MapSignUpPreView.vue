<template>
  <div>
    <div class="map-container">
      <div class="map" id="map-preview"></div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      map: null,
      polygons: [],
    };
  },
  computed: {
    ...mapState(['areas', 'zones']),
    ...mapGetters(['getAreaSelectedForStand']),
  },
  mounted() {
    this.loadDataAndInitializeMap();
  },
  methods: {
    async loadDataAndInitializeMap() {
      try {
        await this.$store.dispatch('getAreas');
        this.initializeMap();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },

    initializeMap() {
      this.map = L.map('map-preview').setView([48.859024, 2.329182], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      this.updateMap();
    },




    updateMap() {
      this.polygons.forEach(polygon => polygon.remove());
      this.polygons = [];

      console.log(this.$store.state.areaSelectedForStand)

      if (this.$store.state.areaSelectedForStand === null) {
        const areas = this.areas;
        const filteredAreas = areas.filter(zone => zone.isfree === true);
        filteredAreas.forEach(zone => {
          const polygon = L.polygon(zone.coordinates, {
            color: 'blue',
            fillOpacity: 0.8,
          }).addTo(this.map);
          this.polygons.push(polygon);
        });
      } else  {
        const selectedZone = this.$store.state.areaSelectedForStand;
        const center = findPolygonCenter(selectedZone.coordinates);
          this.map.setView(center,15)
          const polygon = L.polygon(selectedZone.coordinates, {
          color: 'blue',
          fillOpacity: 0.8,
        }).addTo(this.map);
        this.polygons.push(polygon);
      }
    },
  },
  watch: {
    areas: 'updateMap',
    zones: 'updateMap',
    getAreaSelectedForStand: 'updateMap',
  },
};

function findPolygonCenter(coordinates) {
  let sumLat = 0, sumLng = 0;

  // Sum up all latitude and longitude values
  coordinates.forEach(coord => {
    sumLat += coord[0];
    sumLng += coord[1];
  });

  // Calculate average latitude and longitude
  const avgLat = sumLat / coordinates.length;
  const avgLng = sumLng / coordinates.length;

  return [avgLat, avgLng];
}

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
