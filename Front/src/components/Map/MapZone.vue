<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';


export default {
  data() {
    return {
      map: null,
      polygons: [],

    };
  },
  mounted() {
    this.initializeMap();
  },
  computed: {
    //...mapGetters(['getAreas', 'getSelectedZone', 'getSelectedType']),
    ...mapGetters(['getSelectedZone', 'getSelectedType']),

    ...mapState(['areas', 'zones']),

  },

  created() {
    this.$store.dispatch('getAreas')
    this.$store.dispatch('getZones')
  },

  methods: {

    ...mapActions(['getAreas', 'getZones']),

    initializeMap() {
      this.map = L.map('map').setView([48.857572, 2.2977709], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      this.updateMap(); // Appel initial de la mise à jour de la carte
    },
    showZoneInfo(zone) {
      // Affichez les informations de la zone
      console.log(zone);
    },
    updateMap() {
      console.log('update');
      // Supprimez les polygones actuels de la carte
      this.polygons.forEach(polygon => {
        this.map.removeLayer(polygon);
      });

      const selectedZoneIds = this.getSelectedZone;
      const selectedTypeIds = this.getSelectedType;


      console.log('Zone selectionné' + selectedZoneIds);
      console.log('Type de prestation selectionnée' + selectedTypeIds)

      const areas = this.areas;


      const filteredAreas = areas.filter(zone => {
        return (

            (selectedZoneIds.length === 0 || selectedZoneIds.includes(zone.id_zone)) &&
            (selectedTypeIds.length === 0 || selectedTypeIds.some(id => zone.id_type_prestation.includes(id)))
        );
      });

      // Ajoutez à nouveau les polygones filtrés à la carte
      filteredAreas.forEach(zone => {
        const polygon = L.polygon(zone.coordinates, {
          color: 'blue',
          fillOpacity: 0.5,
        }).addTo(this.map);

        polygon.on('click', () => {
          this.showZoneInfo(zone);
        });

        this.polygons.push(polygon);
      });
    },
    ...mapMutations(['SET_SELECTED_ZONE', 'SET_SELECTED_TYPE']),
  },
  watch: {
    // Surveillez les changements dans les sélections
    getSelectedZone: 'updateMap',
    getSelectedType: 'updateMap',
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
