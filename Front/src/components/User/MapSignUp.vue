<template>
  <div>
    <div class="map-container">
      <div id="map"></div>
    </div>
  </div>
</template>


<script>
import L from 'leaflet';
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';

export default {

  data() {
    return {
      map: null,
      selectedStand: null,
      polygons: [],

    };
  },
  async mounted() {
    try {
      await this.$store.dispatch('getAreas');
      await this.$store.dispatch('getZones');
      this.initializeMap();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    //...mapGetters(['getAreas', 'getSelectedZone', 'getSelectedType']),
    ...mapGetters([
      'getSelectedZone',
      'getSelectedTypeZones',
    ]),
    ...mapState(['areas', 'zones']),
  },

  methods: {
    ...mapActions(['getAreas', 'getZones']),

    initializeMap() {
      console.log('initalized')



      this.map = L.map('map').setView([48.859024, 2.329182], 14);


      // Initialise la carte Leaflet avec une vue par défaut

      // Ajoute une couche de tuiles OpenStreetMap à la carte
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      console.log('end of initalization')
      this.updateMap()
    },
    showZoneInfo(zone) {
      console.log(zone); // Vérifiez si les données zone sont correctes
      this.selectedStand = zone;
    },
    updateMap() {
      console.log('updateMAP');
      // Supprimez les polygones actuels de la carte
      this.polygons.forEach(polygon => {
        this.map.removeLayer(polygon);
      });


      const selectedZoneIds = this.getSelectedZone;
      const selectedTypeZoneIds = this.getSelectedTypeZones;
      const areas = this.areas;

      console.log("zone")
      console.log(selectedZoneIds)
      console.log("type zone")
      console.log(selectedTypeZoneIds)

      const hasSearchCriteria = selectedZoneIds.length > 0 || selectedTypeZoneIds.length > 0;

      let filteredAreas = [];

      if (hasSearchCriteria) {
        filteredAreas = areas.filter(zone => {
          const matchesZone = selectedZoneIds.length === 0 || selectedZoneIds.includes(zone.id_zone);
          const matchesType = selectedTypeZoneIds.length === 0 || selectedTypeZoneIds.includes(zone.id_type_zone);

          return (zone.isfree === true) && matchesZone && matchesType;
        });
      }

      if (!hasSearchCriteria) {
        // Si aucun critère de recherche spécifique n'est défini, affichez toutes les zones disponibles
        filteredAreas = areas.filter(zone => {
          return (zone.isfree === true)});
      }

      // Ajoutez à nouveau les polygones filtrés à la carte
      filteredAreas.forEach(zone => {
        const polygon = L.polygon(zone.coordinates, {
          color: 'blue',
          fillOpacity: 0.8,
        }).addTo(this.map);

        polygon.on('click', () => {
          this.showZoneInfo(zone);
        });

        this.polygons.push(polygon);
      });
    },
    ...mapMutations(['SET_SELECTED_ZONE', 'SET_SELECTED_TYPE','SET_IS_AREA_SELECTED']),
  },
  watch: {
    // Surveillez les changements dans les sélections
    getSelectedZone: 'updateMap',
    getSelectedTypeZones: 'updateMap'
  },

  components: {
     // Enregistrez le composant ModalStand
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
