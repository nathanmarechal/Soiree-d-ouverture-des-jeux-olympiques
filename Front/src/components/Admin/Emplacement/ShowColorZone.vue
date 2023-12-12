<template>
  <div class="d-flex flex-column gap-4">
    <h2>{{translate("showColorZone_1")}}</h2>
    <div v-for="(zone, index) in getAllZone" :key="index" class="d-flex align-content-center">
      <div class="cercle" :style="{ background: zone.couleur_hexa }"></div>
      <span>{{ zone.libelle }} ({{zone.type_zone_libelle}})</span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {translate} from "@/lang/translationService";

export default {
  /*
  data() {
    return {
      zones: [],
    };
  },
   */
  async mounted() {
    await this.loadData();
    //this.zones = await this.getZones();
  },
  computed: {
    ...mapGetters(['getAllZone']),
  },
  methods: {
    translate,
    ...mapActions(['getZonesStore']),
    async loadData() {
      try {
        if (this.getAllZone.length === 0)
          await this.getZonesStore();
      } catch (error) {
        //const txt = translate("showColorZone_err")
        //console.error(txt, error);
        console.error("Erreur lors du chargement des données :", error);
      }
    },
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
