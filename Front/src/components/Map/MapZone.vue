<template>
  <div>
    <div class="map-container">
      <div id="map"></div>
    </div>
    <!-- Utilisez un élément pour afficher la modal -->

    <ModalStand @close="toggleModal" :modalActive="modalActive" :stand="selectedStand">
      <!-- Contenu personnalisé ici -->
    </ModalStand>
  </div>
</template>


<script>
import L from 'leaflet';
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';

import ModalStand from './ModalStand.vue';

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
      await this.$store.dispatch('getZones');
      this.initializeMap(); // Appelez initializeMap() après avoir attendu le chargement des données
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters([
      'getSelectedZone',
      'getSelectedType',
      'getMinPrice',
      'getMaxPrice',
      'getSearchQuery'
    ]),
    ...mapState(['areas', 'zones']),
  },
  methods: {
    ...mapActions(['getAreas', 'getZones']),
    initializeMap() {
      console.log('initalized')

      // Initialise la carte Leaflet avec une vue par défaut
      this.map = L.map('map').setView([48.859024, 2.329182], 14);

      // Ajoute une couche de tuiles OpenStreetMap à la carte
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      this.updateMap()
    },
    showZoneInfo(zone) {
      console.log(zone); // Vérifiez si les données zone sont correctes
      this.selectedStand = zone;
      this.modalActive = true;
    },
    updateMap() {
      console.log('updateMAP');
      // Supprimez les polygones actuels de la carte
      this.polygons.forEach(polygon => {
        this.map.removeLayer(polygon);
      });

      const selectedZoneIds = this.getSelectedZone;
      const selectedTypeIds = this.getSelectedType;
      const searchQuery = this.getSearchQuery;

      const areas = this.areas;

      const hasSearchCriteria = searchQuery.trim() !== '' || selectedZoneIds.length > 0 || selectedTypeIds.length > 0;

      let filteredAreas = [];

      if (hasSearchCriteria) {
        filteredAreas = areas.filter(zone => {
          const matchesSearch = !searchQuery || (zone.nom_stand && zone.nom_stand.toLowerCase().includes(searchQuery.toLowerCase())) || (zone.description_stand && zone.description_stand.toLowerCase().includes(searchQuery.toLowerCase()));
          const matchesZone = selectedZoneIds.length === 0 || selectedZoneIds.includes(zone.id_zone);
          const matchesType = selectedTypeIds.length === 0 || (zone.id_type_prestation && zone.id_type_prestation.some(id => selectedTypeIds.includes(id)));

          return (zone.isfree === false) && matchesSearch && matchesZone && matchesType;
        });
      }
      if (!hasSearchCriteria) {
        // Si aucun critère de recherche spécifique n'est défini, affichez toutes les zones disponibles
        filteredAreas = areas.filter(zone => {
          return (zone.isfree === false)       });
      }
      // Ajoutez à nouveau les polygones filtrés à la carte



      const averageCenter = findAverageCenter(filteredAreas);

      this.map.setView(averageCenter)
      const bounds = L.latLngBounds();

      filteredAreas.forEach((zone) => {
        console.log(zone.couleur_hexa)
        const polygon = L.polygon(zone.coordinates, {
          color: zone.couleur_hexa,
          fillOpacity: 0.9,
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
    toggleModal() {
      this.modalActive = !this.modalActive;
      if (!this.modalActive) {
        this.selectedStand = null; // Réinitialiser lors de la fermeture de la modal
      }
    },
    ...mapMutations(['SET_SELECTED_ZONE', 'SET_SELECTED_TYPE']),
  },
  watch: {
    // Surveillez les changements dans les sélections
    getSelectedZone: 'updateMap',
    getSelectedType: 'updateMap',
    getSearchQuery: 'updateMap'
  },

  components: {
    ModalStand // Enregistrez le composant ModalStand
  },
};




function findAverageCenter(polygons) {
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
}
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
