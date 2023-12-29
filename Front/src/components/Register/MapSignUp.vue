<template>
  <div>
    <div class="map-container">
      <div id="map"></div>
    </div>

    <div class="d-flex justify-content-between " v-if="isAreaSelected">
      <p>Emplacement : {{selectedStand.id_emplacement}}</p>
      <p>Zone : {{selectedStand.zone}}</p>
      <button type="button" class="btn btn-success" @click="saveSelectedArea">Valider</button>
    </div>

  </div>
</template>


<script>
import L from 'leaflet';
import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  data() {
    return {
      map: null,
      selectedStand: null,
      isAreaSelected: false,
      polygons: [],

    };
  },
  async mounted() {
    try {
      await this.loadData()
      this.initializeMap();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    //...mapGetters(['getAreas', 'getSelectedZone', 'getSelectedType']),
    ...mapGetters([
      'getAllArea',
      'getAllZone',
      'getSelectedZone',
      'getSelectedTypeZones',
    ]),
  },

  methods: {
    ...mapActions(['getAreasStore', 'getZonesStore']),

    async loadData(){
      try {
        if (this.getAllArea.length === 0)
          await this.getAreasStore();
        if (this.getAllZone.length === 0)
          await this.getZonesStore();
      }
      catch (error) {
        console.log("Erreur lors de la récupération des données : " + error);
      }
    },

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
      this.$store.state.isAreaSelected = true;
      this.isAreaSelected = true;
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

      const averageCenter = this.findAverageCenter(filteredAreas);

      this.map.setView(averageCenter)
      const bounds = L.latLngBounds();

      filteredAreas.forEach((zone) => {
        const polygon = L.polygon(zone.coordinates, {
          color: zone.couleur_hexa,
          fillOpacity: 0.8,
          weight: 5,
        }).addTo(this.map);

        zone.coordinates.forEach((coord) => {
          bounds.extend(coord);
        });

        polygon.on('click', () => {
          this.showZoneInfo(zone);
        });

        this.polygons.push(polygon);
      });
      this.map.fitBounds(bounds);

    },
    ...mapMutations(['SET_SELECTED_AREA']),

    saveSelectedArea() {
      this.SET_SELECTED_AREA(this.selectedStand);
      console.log('la gadji c est un paqueta')
      console.log(this.$store.state.areaSelectedForStand)
      // Vous pouvez également inclure d'autres logiques ici si nécessaire
    },

    findAverageCenter(polygons) {
      let totalLat = 0, totalLng = 0, totalCount = 0;

      polygons.forEach(zone => {
        zone.coordinates.forEach(coord => {
          totalLat += coord[0]; // Assurez-vous que coord[0] est la latitude
          totalLng += coord[1]; // et coord[1] est la longitude
          totalCount++;
        });
      });

      const avgLat = totalLat / totalCount;
      const avgLng = totalLng / totalCount;

      return [avgLat, avgLng];
    },
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
  height: 95%;
}
#map {
  width: 100%;
  height: 100%;
}
</style>
