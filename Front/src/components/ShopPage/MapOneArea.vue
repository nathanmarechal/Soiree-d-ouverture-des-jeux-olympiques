<template>
  <div>
    <div id="stand-map" class="stand-map"></div> <!-- Add a div for the stand map -->
  </div>
</template>

<script>
import L from 'leaflet';
import { mapActions, mapGetters } from "vuex";

export default {
  props: ['stand'],
  data() {
    return {
      standArea: null, // Variable pour stocker l'aire du stand
      standMap: null // Ajoutez une propriété pour la carte
    };
  },
  computed: {
    ...mapGetters(['getAllArea']),
  },
  methods: {
    ...mapActions(['getAreasStore']),
    async loadData() {
      if (this.getAllArea.length === 0) {
        await this.getAreasStore();
      }

      this.standArea = this.getAllArea.find(area => area.id_emplacement === this.stand.id_emplacement);
    },
    initializeStandMap() {
      // Initialise la carte pour le stand spécifique
      this.standMap = L.map('stand-map').setView([48.857572, 2.2977709], 17); // Utilisez des coordonnées par défaut ou celles de standArea

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.standMap);

      if (this.standArea) {
        // Dessine l'aire du stand sur la carte
        const polygon = L.polygon(this.standArea.coordonnes, {
          color: 'blue',
          fillOpacity: 0.5
        }).addTo(this.standMap);

        this.standMap.fitBounds(polygon.getBounds()); // Ajuste la vue de la carte pour inclure le polygon
      }
    }
  },
  async created() {
    await this.loadData();
    this.initializeStandMap();
  },
  mounted() {
     // Initialise la carte après que le composant est monté
  }
};
</script>

<style scoped>
.stand-map {
  height: 20vh; /* Réglez la hauteur selon vos besoins */
  width: 50vh;
}
</style>
