<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet';

export default {
  props: {
    areas: {
      type: Array,
      required: true
    },
    showZoneList: {type: Array},
    showPrestationList: {type: Array}

  },
  data() {
    return {
      map: null,
      polygons: [] // Stockez les références des polygones pour pouvoir les supprimer
    };
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      // Créez la carte et ajoutez la couche de tuiles
      this.map = L.map('map').setView([48.857572, 2.2977709], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // Créez les polygones pour chaque zone
      this.areas.forEach(zone => {
        const polygon = L.polygon(zone.coordinates, {
          color: 'blue',
          fillOpacity: 0.5
        }).addTo(this.map);

        polygon.on('click', () => {
          this.showZoneInfo(zone);
        });

        this.polygons.push(polygon);
      });
    },
    showZoneInfo(zone) {
      // Affichez les informations de la zone, par exemple, en utilisant une boîte de dialogue modale
      alert(`ID: ${zone.id} Zone: ${zone.zone}\nSurface Area: ${zone.surface_area}\nStand: ${zone.nom}\nDescription: ${zone.description}`);
    },

    updateMap() {
      // Supprimez les polygones actuels de la carte
      this.polygons.forEach(polygon => {
        this.map.removeLayer(polygon);
      });
      console.log("coucou")

      // Filtrer les zones à afficher en fonction des sélections
      const filteredAreas = this.areas.filter(zone => {
        return (
            this.showZoneList.includes(zone.id_zone) &&
            zone.id_prestation.some(id => this.showPrestationList.includes(id))
        );
      });

    // Ajoutez à nouveau les polygones filtrés à la carte
    filteredAreas.forEach(zone => {
      const polygon = L.polygon(zone.coordinates, {
        color: 'blue',
        fillOpacity: 0.5
      }).addTo(this.map);

      polygon.on('click', () => {
        this.showZoneInfo(zone);
      });

      this.polygons.push(polygon);
    });
  }

  },
  watch: {
    // Surveillez les changements dans les tableaux selectedZones et selectedTypePrestations
    selectedZones: 'updateMap',
    selectedTypePrestations: 'updateMap'
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
