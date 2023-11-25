<template>
  <div class="d-flex flex-column gap-4">
    <h2>Légende des zones</h2>
    <div v-for="(zone, index) in zones" :key="index" class="d-flex align-content-center">
      <div class="cercle" :style="{ background: zone.couleur_hexa }"></div>
      <span>{{ zone.libelle }} ({{zone.type_zone_libelle}})</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      zones: [], // Initialisation du tableau des zones
    };
  },
  async created() {
    // Appel de la méthode getZone pour obtenir les données des zones depuis le store Vuex
    this.zones = await this.getZones();
  },
  methods: {
    ...mapActions(['getZones']),
  },
};
</script>

<style scoped>
.cercle {
  width: 2vh;
  height: 2vh;
  border-radius: 50%;
  border: 2px solid black;
  display: inline-block;
  margin-right: 10px; /* Ajoutez une marge pour séparer les cercles des noms de zones */
}

span {
  vertical-align: middle; /* Alignez le texte au milieu des cercles */
}
</style>
