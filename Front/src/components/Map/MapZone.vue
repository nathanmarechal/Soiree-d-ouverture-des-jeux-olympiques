<template>
  <div>
    <div class="map-container">
      <div id="map"></div>
    </div>
    <ModalStand v-if="modalActive" @close="toggleModal" :modalActive="modalActive" :stand="selectedStand">

    </ModalStand>
  </div>
</template>


<script>
import L from 'leaflet';
import { mapActions, mapGetters, mapMutations} from 'vuex';

import ModalStand from './ModalStand.vue';

export default {

  data() {
    return {
      //areas : [],
      //zones : [],
      areasShow : [],
      map: null,
      selectedStand: null,
      polygons: [],
      modalActive: false
    };
  },
  async mounted() {
    try {
      this.$store.commit('prestationEtType/SET_SELECTED_TYPE_PRESTATION', []);
      this.$store.commit('stands/SET_SELECTED_STANDS', []);
      //this.areas = await this.getAreas();
      //this.zones = await this.getZones();
      //await this.$store.dispatch('getAreas');
      //await this.$store.dispatch('getZones');
      await this.loadData();
      this.initializeMap(); // Appelez initializeMap() après avoir attendu le chargement des données
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters('ZoneEtType', ['getAllZone', 'getSelectedZone']),
    ...mapGetters('stands', ['getAllStand']),
    ...mapGetters('prestationEtType', ['getAllPrestation', 'getSelectedTypePrestation']),
    ...mapGetters('emplacements', ['getAllArea']),
    ...mapGetters('user', ['getSearchQuery'])

    //...mapState(['areas', 'zones']),
  },

methods: {
  ...mapActions('ZoneEtType', ['getZonesStore']),
  ...mapActions('stands', ['getStandsStore']),
  ...mapActions('prestationEtType', ['getPrestationsStore']),
  ...mapActions('emplacements', ['getAreasStore']),
    async loadData() {
      try {
        if (this.getAllArea.length === 0) {
          await this.getAreasStore();
        }
        if (this.getAllZone.length === 0) {
          await this.getZonesStore();
        }
        if (this.getAllStand.length === 0) {
          await this.getStandsStore();
        }
        if (this.getAllPrestation.length === 0) {
          await this.getPrestationsStore();
        }

        this.areasShow = this.mergeData();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    mergeData() {
      return this.getAllStand.map(stand => {
        // Trouver l'area correspondante
        const area = this.getAllArea.find(area => area.id_emplacement === stand.id_emplacement) || {};

        // Trouver la zone correspondante
        const zone = this.getAllZone.find(zone => zone.id_zone === area.id_zone) || {};

        // Trouver les prestations liées
        const prestations = this.getAllPrestation.filter(prestation => prestation.id_stand === stand.id_stand);

        return {
          id_emplacement: area.id_emplacement,
          nom_emplacement: zone.libelle, // ou autre propriété selon votre structure
          image_stand: stand.image_stand,
          nom_stand: stand.nom_stand,
          id_stand: stand.id_stand,
          description_stand: stand.description_stand,
          zone: zone.libelle,
          id_zone: zone.id_zone,
          id_type_zone: zone.id_type_zone,
          couleur_hexa: zone.couleur_hexa,
          id_type_prestation: prestations.map(p => p.id_type_prestation),
          coordinates: area.coordonnes,
          surface: area.surface,
          // Ajoutez d'autres champs si nécessaire
        };
      });
    },
    initializeMap() {

      // Initialise la carte Leaflet avec une vue par défaut
      this.map = L.map('map').setView([48.859024, 2.329182], 14);
      
      // Ajoute une couche de tuiles OpenStreetMap à la carte
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      if (this.map == null) {
        console.log("MAP NULL 1")
      }
      this.updateMap()
    },
    showZoneInfo(zone) {
      this.selectedStand = zone;
      this.modalActive = true;
    },
    updateMap() {
      // Supprimez les polygones actuels de la carte

      if (this.map == null) {
        console.log("MAP NULL")
      }
      
      this.polygons.forEach(polygon => {
        this.map.removeLayer(polygon);
      });

      const selectedZoneIds = this.getSelectedZone;
      const selectedTypePrestationIds = this.getSelectedTypePrestation;
      const searchQuery = this.getSearchQuery;
      //const areas = this.areas;

      const hasSearchCriteria = searchQuery.trim() !== '' || selectedZoneIds.length > 0 || selectedTypePrestationIds.length > 0;

      let filteredAreas = [];

      if (hasSearchCriteria) {
        filteredAreas = this.areasShow.filter(zone => {
          const matchesSearch = !searchQuery || (zone.nom_stand && zone.nom_stand.toLowerCase().includes(searchQuery.toLowerCase())) || (zone.description_stand && zone.description_stand.toLowerCase().includes(searchQuery.toLowerCase()));
          const matchesZone = selectedZoneIds.length === 0 || selectedZoneIds.includes(zone.id_zone);
          const matchesType = selectedTypePrestationIds.length === 0 || (zone.id_type_prestation && zone.id_type_prestation.some(id => selectedTypePrestationIds.includes(id)));

          return matchesSearch && matchesZone && matchesType;
        });
      }else {
        filteredAreas = this.areasShow
      }

      const averageCenter = this.findAverageCenter(filteredAreas);


      this.map.setView(averageCenter)
      const bounds = L.latLngBounds();

      const self = this;

      filteredAreas.forEach((zone) => {
        const polygon = L.polygon(zone.coordinates, {
          color: zone.couleur_hexa,
          fillOpacity: 0.8,
          weight: 5,
        }).addTo(this.map);

        polygon.on('mouseover', function (e) {
          L.popup()
              .setLatLng(e.latlng)
              .setContent(zone.nom_stand)
              .openOn(self.map); // Utilisez 'self.map' ici
        });

        polygon.on('mouseout', function() {
          self.map.closePopup(); // Utilisez 'self.map' ici
        });

        // Ajuster les limites pour chaque coordonnée
        zone.coordinates.forEach((coord) => {
          bounds.extend(coord);
        });

        // Gestionnaire pour l'événement 'click'
        polygon.on('click', () => {
          this.showZoneInfo(zone);
        });

        // Stockage des polygones
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
  ...mapMutations(['ZoneEtType/SET_SELECTED_ZONE', 'prestationEtType/SET_TYPE_PRESTATIONS']),
  },
  watch: {
    // Surveillez les changements dans les sélections
    getSelectedZone: 'updateMap',
    getSelectedTypePrestation: 'updateMap',
    getSearchQuery: 'updateMap'
  },

  components: {
    ModalStand // Enregistrez le composant ModalStand
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
