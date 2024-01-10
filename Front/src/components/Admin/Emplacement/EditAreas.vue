<template>
  <div>
    <div>
      <button v-if="isProtectorDelete" @click="deleteAll()" class="btn btn-danger">{{ translate("EditAreas_1") }}</button>
    </div>
    <div class="map-container">
      <div id="map"></div>
    </div> 
    <div>
      <ModalEditArea :isProtectorDelete="isProtectorDelete" :modalActiveEditArea="modalActiveEditArea" :selectedArea="selectedArea" @NeedProtection="handleNeedProtection" @close="toggleModalEdit"/>
      <ModalAddArea :modalActiveAddArea="modalActiveAddArea" :newArea="newArea" @close="toggleModalAdd"/>
      <modal-add-emplacement-logistique :modalActiveAddEmplacementLogistique="modalActiveAddEmplacementLogistique" :newEmplacementLogistique="newEmplacementLogistique" @close="toggleModalAddEmplacementLogistique"/>
      <modal-edit-emplacement-logistique :modalActiveEditEmplacementLogistique="modalActiveEditEmplacementLogistique" :selectedEmplacementLogistique="selectedEmplacementLogistique" @close="toggleModalEditEmplacementLogistique"/>
    </div>
  </div> 
</template>

<script>
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import 'leaflet-draw';

import ModalEditArea from '@/components/Admin/Emplacement/EmplacementStand/ModalEditArea.vue'
import ModalAddArea from '@/components/Admin/Emplacement/EmplacementStand/ModalAddArea.vue'
import ModalAddEmplacementLogistique from "@/components/Admin/Emplacement/EmplacementLogisitique/ModalAddEmplacementLogistique.vue";
import ModalEditEmplacementLogistique from "@/components/Admin/Emplacement/EmplacementLogisitique/ModalEditEmplacementLogistique.vue";
import {translate} from "@/lang/translationService";
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    ModalEditArea,
    ModalAddArea,
    ModalAddEmplacementLogistique,
    ModalEditEmplacementLogistique
  },
  props: {
    isProtectorDelete: {
      type: Boolean,
      default: false,
    },
    filterProtector:{
      //contain all data that need to be shown
      type: Array,
      required: false,
      default: () => null,
    }
  },
  data() {
    return {
      areas: null,
      map: null,
      selectedArea: null,
      selectedEmplacementLogistique: null,
      polygons: [],
      markers: [],
      newArea: null,
      newEmplacementLogistique:null,
      modalActiveEditArea: false,
      modalActiveAddArea: false,
      modalActiveEditEmplacementLogistique: false,
      modalActiveAddEmplacementLogistique: false,
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
    ...mapGetters('emplacementLogistiqueEtType', ['getAllTypeEmplacementLogistique', 'getAllEmplacementLogistique']),
    ...mapGetters('emplacements', ['getAllArea']),
    ...mapGetters('ZoneEtType', ['getAllZone']),
    ...mapGetters('stands', ['getAllStand']),
    filteredAreas() {
      var data = [];
      console.log('filteredAreasaaaaaaaaaaaa');
      console.log("filtered protector", this.filterProtector);
      console.log("all area", this.getAllArea);
      if(!this.isProtectorDelete){
        return data = this.getAllArea;
      }else{
        for (var i = 0; i < this.getAllArea.length; i++) {
          for (var j = 0; j < this.filterProtector.length; j++) {
            if (this.getAllArea[i].id_emplacement === this.filterProtector[j].id_emplacement) {
              data.push(this.getAllArea[i]);
            }
        }
      }
    }
    if (data.length === 0) {
      this.goBack();
    }
    return data;
    },
  },
  methods: {
    ...mapActions('emplacementLogistiqueEtType', ['getTypeEmplacementLogistiqueStore', 'getEmplacementLogistiqueStore']),
    ...mapActions('emplacements', ['getAreasStore', 'deleteAreasStore']),
    ...mapActions('ZoneEtType', ['getZonesStore']),
    ...mapActions('stands', ['getStandsStore', 'deleteStandStore']),    translate,
    async loadData() {
      try {
        if (this.getAllArea.length === 0) {
          await this.getAreasStore();
          console.log('getAllArea', this.getAllArea);
        }
        if (this.getAllZone.length === 0) {
          await this.getZonesStore();
          console.log('getAllZone', this.getAllZone);
        }
        if (this.getAllStand.length === 0) {
          await this.getStandsStore();
          console.log('getAllStand', this.getAllStand);
        }
        if (this.getAllTypeEmplacementLogistique.length === 0) {
          await this.getTypeEmplacementLogistiqueStore();
          console.log('getAllTypeEmplacementLogistique', this.getAllTypeEmplacementLogistique);
        }
        if (this.getAllEmplacementLogistique.length === 0) {
          await this.getEmplacementLogistiqueStore();
          console.log('getAllEmplacementLogistique', this.getAllEmplacementLogistique);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    mergeLogisticLocations() {
      if(!this.isProtectorDelete){
      return this.getAllEmplacementLogistique.map(location => {
        const type = this.getAllTypeEmplacementLogistique.find(type => type.id_type_emplacement_logistique === location.id_type_emplacement_logistique) || {};
        return {
          ...location,
          image: type.image,
          libelle_type_emplacement_logistique: type.libelle // ou utilisez location.libelle si différent
        };
      });}
    },

    mergeData() {
      const area = this.filteredAreas;
      return area.map(area => {
        // Trouver le stand correspondant
        const stand = this.getAllStand.find(stand => stand.id_emplacement === area.id_emplacement) || {};

        // Trouver la zone correspondante
        const zone = this.getAllZone.find(zone => zone.id_zone === area.id_zone) || {};
        return {
          id_emplacement: area.id_emplacement,
          id_stand: stand.id_stand || null,
          zone: zone.libelle || '',
          id_zone: zone.id_zone || null,
          id_type_zone: zone.id_type_zone || null,
          couleur_hexa: zone.couleur_hexa || '',
          coordinates: area.coordonnes,
          surface: area.surface,
          isFree: !stand
        };
      });
    },
    initializeMap() {
      // Initialize the Leaflet map with a default view
      this.map = L.map('map').setView([48.859024, 2.329182], 14);

      // Add an OpenStreetMap tile layer to the map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      // Initialize the drawing control
      if(!this.isProtectorDelete){
        const drawControl = new L.Control.Draw({
        draw: {
          polygon: true,
          polyline: false,
          rectangle: false,
          circle: false,
          marker: true,
          circlemarker:false
          },
        });
              
        // Add the drawing control to the map
        this.map.addControl(drawControl);
      }


      // Handle draw events
      this.map.on('draw:created', (event) => {
        const layer = event.layer;
        const layerType = event.layerType;

        if (layerType === 'polygon') {
          // Handle polygon creation
          this.newArea = {
            coordinates: [],
            surface: 0,
          };
          this.addArea(layer.getLatLngs());
        } else if (layerType === 'marker') {
          // Handle marker creation
          this.addEmplacementLogistique(layer.getLatLng());
        }

        // For any common operations after adding the layer to the map
        // this.map.addLayer(layer);
      });

      this.updateMap();
    },

    updateMap() {
      console.log('updateMAP');

      // Existing code to handle areas and polygons
      const areas = this.mergeData();
      this.polygons.forEach(polygon => {
        this.map.removeLayer(polygon);
      });
      this.polygons = []; // Clear the polygons array
      //print true or false
      areas.forEach(area => {
        const polygon = L.polygon(area.coordinates, {
          color: area.couleur_hexa,
          fillOpacity: 0.9,
        }).addTo(this.map);
        polygon.on('click', () => {
          this.showAreaInfo(area);
        });
        this.polygons.push(polygon);
      });

      // Handling logistic locations and markers
      const logisticLocations = this.mergeLogisticLocations();

      // Remove existing markers
      if (this.markers) {
        this.markers.forEach(marker => {
          this.map.removeLayer(marker);
        });
      }

      this.markers = []; // Clear the markers array

        if (!this.isProtectorDelete){
          logisticLocations.forEach(location => {
          console.log('Icon URL:', '/assets/Logos/' + location.image);
          const iconUrl = require('@/assets/Logos/' + location.image);

          const customIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: [20, 20], // taille de l'icône
            iconAnchor: [20, 20] // point d'ancrage au bas du centre de l'icône
          });

          const marker = L.marker(location.coordonnes, {
            icon: customIcon,
            title: location.libelle // Le libellé s'affiche au survol du curseur
          }).addTo(this.map);

          marker.on('click', () => {
            this.showEmplacementLogistiqueInfo(location);
          });

          this.markers.push(marker);
        });
      }
    },

    addEmplacementLogistique(latLng){
      this.newEmplacementLogistique = { coordonnees: [latLng.lat, latLng.lng] };
      this.toggleModalAddEmplacementLogistique();
    },

    addArea(coordinates) {
      this.toggleModalAdd();
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
      console.log('selectedArea', this.selectedArea);
    },
    showEmplacementLogistiqueInfo(emplacementLogistique) {
      this.selectedEmplacementLogistique = emplacementLogistique;
      this.toggleModalEditEmplacementLogistique();
    },

    async toggleModalEdit() {
      this.modalActiveEditArea = !this.modalActiveEditArea;
        this.updateMap();
        console.log('toggleModalEdit', this.modalActiveEditArea);
    },

    async toggleModalAdd() {
      this.modalActiveAddArea = !this.modalActiveAddArea;
        this.updateMap();
    },

    async toggleModalAddEmplacementLogistique() {
      this.modalActiveAddEmplacementLogistique = !this.modalActiveAddEmplacementLogistique;
      this.updateMap();
    },

    async toggleModalEditEmplacementLogistique() {
      this.modalActiveEditEmplacementLogistique = !this.modalActiveEditEmplacementLogistique;
      this.updateMap();
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
    },
    async deleteAll(){
      //delete all area
      console.log("delete all area", this.isProtectorDelete);
      if (this.isProtectorDelete){  
        var areas = this.mergeData();
        areas.forEach(area => {
          try {
            //find if no stand have this id_emplacement
            console.log(area.id_emplacement, this.getAllStand.find(stand => stand.id_emplacement === area.id_emplacement) || false);
            if(this.getAllStand.find(stand => stand.id_emplacement === area.id_emplacement) || false){ 
              console.log("delete stand", area.id_stand);
              this.deleteStandStore(area.id_stand);
            }
            console.log("delete area", area.id_emplacement);
            this.deleteAreasStore(area.id_emplacement);
          } catch (err) {
            console.error('Error deleting area:', err);
          }
        });
        this.goBack();
      }
      //update map
      this.updateMap();
    },
    goBack(){
      window.alert("vous pouvez dorénavant supprimer cette zone");
      this.$router.push(
        {
          name: 'AdminZoneView',
        }
      );
    },
    handleNeedProtection(data) {
      console.log("data: " + JSON.stringify(data, null, 2));
      this.$emit('NeedProtection', data);
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
