<template>
  <div>
    <div class="map-container">
      <div id="map"></div>
    </div>
  </div>
</template>


<script>
import L from 'leaflet';
import { mapActions, mapGetters, mapMutations} from 'vuex';


export default {
  data() {
    return {
      areasShow : [],
      markers: [],
      map: null,
      selectedStand: null,
      lines : [],
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
    ...mapGetters('emplacements', ['getAllArea',]),
    ...mapGetters('stands', ['getAllStand']),
    ...mapGetters('emplacementLogistiqueEtType', ['getAllTypeEmplacementLogistique', 'getAllEmplacementLogistique','getLogisticsRequirements']),

    //...mapState(['areas', 'zones']),
  },

  methods: {
    ...mapActions('ZoneEtType', ['getZonesStore']),
    ...mapActions('emplacementLogistiqueEtType', ['getTypeEmplacementLogistiqueStore', 'getEmplacementLogistiqueStore']),
    ...mapActions('emplacements', ['getAreasStore']),
    ...mapActions('stands', ['getStandsStore']),
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

        if (this.getAllTypeEmplacementLogistique.length === 0) {
          await this.getTypeEmplacementLogistiqueStore();
        }
        if (this.getAllEmplacementLogistique.length === 0) {
          await this.getEmplacementLogistiqueStore();
        }

        console.log(this.areasShow)
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },

    mergeLogisticLocations() {
      return this.getAllEmplacementLogistique.map(location => {
        const type = this.getAllTypeEmplacementLogistique.find(type => type.id_type_emplacement_logistique === location.id_type_emplacement_logistique) || {};
        return {
          ...location,
          image: type.image,
          libelle_type_emplacement_logistique: type.libelle
        };
      });
    },
    mergeData() {
      const areasWithoutStands = this.getAllArea.filter(area => {
        // Vérifier si l'area n'a pas de stand associé
        return !this.getAllStand.some(stand => stand.id_emplacement === area.id_emplacement);
      });

      return areasWithoutStands.map(area => {
        // Trouver la zone correspondante
        const zone = this.getAllZone.find(zone => zone.id_zone === area.id_zone) || {};

        return {
          id_emplacement: area.id_emplacement,
          nom_emplacement: zone.libelle, // ou autre propriété selon votre structure
          zone: zone.libelle,
          id_zone: zone.id_zone,
          id_type_zone: zone.id_type_zone,
          couleur_hexa: zone.couleur_hexa,
          coordinates: area.coordonnes,
          surface: area.surface,
          // Ajoutez d'autres champs si nécessaire
        };
      });
    },
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

      console.log(this.getLogisticsRequirements)

      this.polygons.forEach(polygon => {
        this.map.removeLayer(polygon);
      });

      const selectedZoneIds = this.getSelectedZone;
      //const areas = this.areas;

      const hasSearchCriteria = selectedZoneIds.length > 0

      console.log('data')
      console.log()

      this.areasShow = this.mergeData();
      console.log( this.areasShow)
      let filteredAreas = [];

      if (hasSearchCriteria) {
        filteredAreas = this.areasShow.filter(zone => {
          const matchesZone = selectedZoneIds.length === 0 || selectedZoneIds.includes(zone.id_zone);

          return  matchesZone;
        });
      } else {
        filteredAreas = this.areasShow
      }

      if (this.lines) {
        this.lines.forEach(line => {
          this.map.removeLayer(line);
        });
      }
      this.lines = [];

      const optimalZone = this.filterOptimalZone(filteredAreas);
      if (optimalZone != null) {
        filteredAreas = [optimalZone];
        // Calculez le centre de la zone optimale et tracez des lignes vers les emplacements logistiques les plus proches
        const center = this.calculateCenter(optimalZone.coordinates);
        this.drawLinesToClosestLogistics(center);
      }
      console.log('fini')

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
              .setContent('Surface: ' + zone.surface + 'm²') // Display only the surface information
              .openOn(self.map);
        });

        polygon.on('mouseout', function () {
          self.map.closePopup(); // Utilisez 'self.map' ici
        });

        // Ajuster les limites pour chaque coordonnée
        zone.coordinates.forEach((coord) => {
          bounds.extend(coord);
        });

        // Gestionnaire pour l'événement 'click'
        polygon.on('click', () => {
          this.$emit('dataEmplacement', zone.id_emplacement);
        });

        // Stockage des polygones
        this.polygons.push(polygon);
      });

      this.map.fitBounds(bounds);


      const logisticLocations = this.mergeLogisticLocations();

      console.log(logisticLocations)

      // Remove existing markers
      if (this.markers) {
        this.markers.forEach(marker => {
          this.map.removeLayer(marker);
        });
      }

      this.markers = []; // Clear the markers array

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

    },

    drawLinesToClosestLogistics(center) {
      const closestLogistics = this.findClosestLogistics(center);
      closestLogistics.forEach(location => {
        const line = L.polyline([center, location.coordonnes], {
          color: 'red',
          weight: 3,
        }).addTo(this.map);
        this.lines.push(line); // Gardez  une référence aux lignes pour le nettoyage ultérieur
      });
    },

    findClosestLogistics(center) {
      const logisticLocations = this.mergeLogisticLocations();
      const requirements = this.getLogisticsRequirements; // Obtenez les exigences logistiques
      let closestLocation = null;
      let minDistance = Infinity; // Initialisez la distance minimale à l'infini

      logisticLocations.forEach(location => {
        // Vérifiez si l'emplacement répond aux exigences logistiques
        const meetsRequirements = requirements.every(req => {
          return location.id_type_emplacement_logistique === req.id && location.unite >= req.value;
        });

        if (meetsRequirements) {
          // Calculez la distance entre le centre et l'emplacement logistique
          const distance = this.calculateHaversineDistance(center, location.coordonnes);
          // Si cette distance est la plus petite trouvée et inférieure au seuil, mettez à jour closestLocation
          if (distance < minDistance) {
            minDistance = distance;
            closestLocation = location;
          }
        }
      });

      // Retourne l'emplacement logistique le plus proche s'il existe, sinon null
      return closestLocation ? [closestLocation] : [];
    },



    filterOptimalZone(areasShow) {
      const logisticRequirements = this.getLogisticsRequirements;
      if (!logisticRequirements || logisticRequirements.length === 0) {
        return null;
      }

      const logisticLocations = this.mergeLogisticLocations();
      let optimalZone = null;
      let bestScore = Infinity;

      areasShow.forEach(zone => {
        let totalDistance = 0;
        let requirementsMet = 0;

        logisticRequirements.forEach(req => {
          const relevantLocations = logisticLocations.filter(location =>
              location.id_type_emplacement_logistique === req.id && location.unite >= req.value
          );

          if (relevantLocations.length > 0) {
            const minDistanceForReq = relevantLocations.reduce((minDistance, location) => {
              const distance = this.calculateHaversineDistance(this.calculateCenter(zone.coordinates), location.coordonnes);
              return distance < minDistance ? distance : minDistance;
            }, Infinity);

            totalDistance += minDistanceForReq;
            requirementsMet++;
          }
        });

        // Vérifier que tous les besoins logistiques sont satisfaits pour cette zone
        if (requirementsMet === logisticRequirements.length) {
          const averageDistance = totalDistance / requirementsMet;
          if (averageDistance < bestScore) {
            bestScore = averageDistance;
            optimalZone = zone;
          }
        }
      });

      return optimalZone;
    },


    calculateCenter(coordinates) {
      let latSum = 0, lngSum = 0;
      coordinates.forEach(coord => {
        latSum += coord[0]; // Assumer coord[0] est la latitude
        lngSum += coord[1]; // Assumer coord[1] est la longitude
      });
      return [latSum / coordinates.length, lngSum / coordinates.length];
    },

    findOptimalLogisticsLocation(center, logisticLocations, logisticsRequirements) {
      let relevantLocations = logisticLocations.filter(location =>
          this.meetsLogisticsRequirements(location, logisticsRequirements)
      );

      if (relevantLocations.length === 0) return null;

      let totalDistance = 0;
      relevantLocations.forEach(location => {
        totalDistance += this.calculateHaversineDistance(center, location.coordonnes);
      });

      return { coordonnes: center, averageDistance: totalDistance / relevantLocations.length };
    },

    meetsLogisticsRequirements(location, logisticsRequirements) {
      return logisticsRequirements.every(req => {
        return location.id_type_emplacement_logistique === req.id && location.unite >= req.value;
      });
    },

    calculateHaversineDistance(coord1, coord2) {
      const toRadian = angle => (Math.PI / 180) * angle;
      const distance = (a, b) => (Math.PI / 180) * (a - b);
      const RADIUS_OF_EARTH_IN_KM = 6371;

      const dLat = distance(coord2[0], coord1[0]);
      const dLon = distance(coord2[1], coord1[1]);

      const lat1 = toRadian(coord1[0]);
      const lat2 = toRadian(coord2[0]);

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return RADIUS_OF_EARTH_IN_KM * c;
    },




    ...mapMutations('ZoneEtType', ['SET_SELECTED_ZONE']),
    ...mapMutations('prestationEtType', ['SET_SELECTED_TYPE_PRESTATION']),
  },
  watch: {
    // Surveillez les changements dans les sélections
    getSelectedZone: 'updateMap',
    getSelectedTypePrestation: 'updateMap',
    getSearchQuery: 'updateMap',
    getLogisticsRequirements: 'updateMap'
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
