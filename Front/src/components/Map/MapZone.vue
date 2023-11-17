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
  mounted() {
    this.initializeMap();
  },
  computed: {
    //...mapGetters(['getAreas', 'getSelectedZone', 'getSelectedType']),
    ...mapGetters(['getSelectedZone', 'getSelectedType']),

    ...mapState(['areas', 'zones']),

    ...mapGetters(['getAreas', 'getSelectedZone', 'getSelectedType']),

    isAreaSelected() {
      return this.$store.getters.getIsAreaSelected
    }
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
      console.log(zone); // Vérifiez si les données zone sont correctes
      this.selectedStand = zone;
      this.$store.commit('SET_IS_AREA_SELECTED', true);
      console.log('state: ' + this.$store.getters.getIsAreaSelected);
      this.modalActive = true;

    },
    closeModal() {
      this.selectedStand = null; // Réinitialise selectedStand
      this.$store.commit('SET_IS_AREA_SELECTED', false);
    },
    updateMap() {
      console.log('update');
      // Supprimez les polygones actuels de la carte
      this.polygons.forEach(polygon => {
        this.map.removeLayer(polygon);
      });

      const selectedZoneIds = this.getSelectedZone;
      const selectedTypeIds = this.getSelectedType;

      console.log("test de mes burnes", this.getAreas)

      const areas = this.areas;


      const filteredAreas = areas.filter(zone => {
        return (
          (zone.isfree === false) &&
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
    toggleModal() {
      this.modalActive = !this.modalActive;
      if (!this.modalActive) {
        this.selectedStand = null; // Réinitialiser lors de la fermeture de la modal
      }
    },
    ...mapMutations(['SET_SELECTED_ZONE', 'SET_SELECTED_TYPE','SET_IS_AREA_SELECTED']),
  },
  watch: {
    // Surveillez les changements dans les sélections
    getSelectedZone: 'updateMap',
    getSelectedType: 'updateMap',
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
