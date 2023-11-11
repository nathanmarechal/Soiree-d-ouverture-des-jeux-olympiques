<template>
  <div class="row">
    <div class="col-lg-8">
      <div class="card">
          <div>
            <div id="map" style="width: 100vh; height: 50vh;"></div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';

export default {
  props: {
    areas: {
      type: Array,
      required: true
    }
  },
  mounted() {
    const map = L.map('map').setView([48.857572, 2.2977709], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Affichez le contenu de la variable areas dans la console
    console.log(this.areas[0]);

    // Ajoutez des polygones pour chaque zone
    this.areas.forEach(zone => {
      const polygon = L.polygon(zone.coordinates, {
        color: 'blue',
        fillOpacity: 0.5
      }).addTo(map);

      // Ajoutez un gestionnaire d'événements de clic pour afficher les informations de la zone
      polygon.on('click', () => {
        this.showZoneInfo(zone);
      });
    });
  },
  methods: {
    showZoneInfo(zone) {
      // Affichez les informations de la zone, par exemple, en utilisant une boîte de dialogue modale
      alert(`ID: ${zone.id} Zone: ${zone.zone}\nSurface Area: ${zone.surface_area}\nStand: ${zone.stand.nom}\nDescription: ${zone.stand.description}`);
    }
  }
};
</script>
