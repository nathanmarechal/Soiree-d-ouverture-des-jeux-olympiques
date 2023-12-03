<template>
  <div>
    <div class="map-container">
      <div id="map"></div>
    </div>
    <modal-edit :modalActiveEdit="modalActiveEdit" :selectedArea="selectedArea" @close="toggleModalEdit"></modal-edit>
    <modal-add :modalActiveAdd="modalActiveAdd" :newArea="newArea" @close="toggleModalAdd"></modal-add>
  </div>
</template>

<script>
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import 'leaflet-draw';

import ModalEdit from '../Emplacement/ModalEdit.vue'
import ModalAdd from '../Emplacement/ModalAdd.vue'

import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    ModalEdit,
    ModalAdd
  },
  data() {
    return {

      map: null,
      selectedArea: null,
      polygons: [],
      newArea: null,
      modalActiveEdit: false,
      modalActiveAdd: false,
    };
  },
  async mounted() {
    try {
      await this.loadData();
      //this.areas = await this.getAreas();
      //this.zones = await this.getZones();
      this.initializeMap(); // Appelez initializeMap() après avoir attendu le chargement des données
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters(['getAllArea', 'getAllZone']),
  },
  methods: {
    ...mapActions(['getAreasStore', 'getZonesStore']),
    async loadData() {
      try {
        if (this.getAllArea.length === 0)
          await this.getAreasStore();
        if (this.getAllZone.length === 0)
          await this.getZonesStore();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    initializeMap() {
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
          circlemarker:false
        },
      });

      // Add the drawing control to the map
      this.map.addControl(drawControl);

      // Handle draw events
      this.map.on('draw:created', (event) => {
        const layer = event.layer;
        this.newArea = {
          coordinates: [],
          surface: 0,
        };
        this.addArea(layer.getLatLngs());
      });

      this.updateMap();
    },

    updateMap() {
      console.log('updateMAP')
      // Supprimez les polygones actuels de la carte
      this.polygons.forEach((polygon) => {
        this.map.removeLayer(polygon);
      });

      //const areas = this.areas;
      // Ajoutez à nouveau les polygones filtrés à la carte
        this.getAllArea.forEach((area) => {
        const polygon = L.polygon(area.coordinates, {
          //color: area.couleur_hexa,
          color: this.getAllZone.find(zone => zone.id_zone === area.id_zone).couleur_hexa,
          fillOpacity: 0.9,
        }).addTo(this.map);
        polygon.on('click', () => {
          this.showAreaInfo(area);
        });
        this.polygons.push(polygon);
      });
    },

    addArea(coordinates) {
      this.toggleModalAdd();

      // Initialisez l'objet newArea avec des propriétés vides

      // Convertir les coordonnées au format souhaité
      const formattedCoordinates = [];

      for (const coord of coordinates[0]) {
        formattedCoordinates.push([
          parseFloat(coord.lat.toFixed(7)), // Conserver 7 décimales pour la latitude
          parseFloat(coord.lng.toFixed(7)), // Conserver 7 décimales pour la longitude
        ]);
      }
      // Assigner les coordonnées et calculer la surface
      this.newArea.coordinates = formattedCoordinates;
      this.newArea.surface = this.calculateEarthSurfaceArea(formattedCoordinates);
    },

    showAreaInfo(area){
      this.toggleModalEdit();
      this.selectedArea = area
    },

    async toggleModalEdit() {
      this.modalActiveEdit = !this.modalActiveEdit;

      // Check if the modal was just closed
      if (!this.modalActiveEdit) {
        // Refresh data if necessary
        //this.areas = await this.getAreas(); // Refresh areas data
        //this.zones = await this.getZones(); // Refresh zones data


        // Update the map
        this.updateMap();
      }
    },

    async toggleModalAdd() {
      this.modalActiveAdd = !this.modalActiveAdd;

      // Check if the modal was just closed

      if (!this.modalActiveAdd) {
        // Refresh data if necessary
        //this.areas = await this.getAreas(); // Refresh areas data
        //this.zones = await this.getZones(); // Refresh zones data

        //await this.getAreasStore()
        //await this.getZonesStore()

        // Update the map
        this.updateMap();
      }


    },

    calculateEarthSurfaceArea(coords) {
      if (coords.length < 3) {
        return 0; // Pas un polygone
      }

      const radius = 6371000; // Rayon moyen de la Terre en mètres
      let area = 0;

      for (let i = 0; i < coords.length; i++) {
        const [lat1, lon1] = coords[i];
        const [lat2, lon2] = coords[(i + 1) % coords.length];

        const radLat1 = lat1 * Math.PI / 180;
        const radLon1 = lon1 * Math.PI / 180;
        const radLat2 = lat2 * Math.PI / 180;
        const radLon2 = lon2 * Math.PI / 180;

        const a = (Math.sin(radLat2) - Math.sin(radLat1)) * (radLon2 - radLon1) / 2;
        area += a;
      }
      return Math.round((Math.abs(area * radius * radius)));
    }
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
