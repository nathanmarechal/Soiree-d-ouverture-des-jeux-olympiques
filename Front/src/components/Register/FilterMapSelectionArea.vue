<template>
  <div>
    <h3>{{ translate("filterMap_1") }}</h3>

    <h4>{{ translate("filterMap_3") }}</h4>
    <div>
      <label for="typeZoneSelect">Select Type of Zone:</label>
      <select id="typeZoneSelect" v-model="selectedTypeZone" @change="updateFilterZone">
        <option v-for="type in getAllTypeZone" :key="type.id_type_zone" :value="type.id_type_zone">{{ type.libelle }}</option>
      </select>
    </div>
    <div v-for="(zone, index) in filteredZones" :key="index" class="form-check">
      <input class="form-check-input" type="checkbox" :id="'zoneCheck' + index" v-model="selectedZones" :value="zone.id_zone">
      <label class="d-flex gap-2 form-check-label" :for="'zoneCheck' + index">
        <span class="color-circle" :style="{ background: zone.couleur_hexa }"></span>{{ zone.libelle }}
      </label>
    </div>

    <h4>Logistics Placement Options</h4>
    <div v-for="(type, index) in getAllTypeEmplacementLogistique" :key="index" class="form-group">
      <label :for="'logistics' + type.id_type_emplacement_logistique">{{ type.libelle }} ({{ type.libelle_unite }})</label>
      <input type="number" :id="'logistics' + type.id_type_emplacement_logistique" class="form-control" v-model="logisticsRequirements[type.id_type_emplacement_logistique]">
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { translate } from "../../lang/translationService";

export default {
  data() {
    return {
      selectedTypePrestations: [],
      selectedZones: [],
      selectedTypeZone: null,
      logisticsRequirements: {},
      searchQuery: this.$store.state.searchQuery
    };
  },
  computed: {
    ...mapGetters(['getAllZone', 'getAllTypeZone', 'getAllTypeEmplacementLogistique']),
    filteredZones() {
      if (this.selectedTypeZone) {
        return this.getAllZone.filter(zone => zone.id_type_zone === this.selectedTypeZone);
      }
      return this.getAllZone;
    }
  },
  methods: {
    translate,
    ...mapActions(['getTypePrestationsStore', 'getZonesStore']),
    async loadData() {
      await this.getZonesStore();
    },
    updateFilterZone() {
      this.$store.commit('SET_SELECTED_ZONE', this.selectedZones);
    },
    updateSearchQuery(event) {
      const searchValue = event.target.value;
      this.$store.commit('SET_SEARCH_QUERY', searchValue);
    },
    ...mapMutations(['SET_SELECTED_TYPE_PRESTATION', 'SET_SELECTED_ZONE', 'SET_SEARCH_QUERY']),
  },
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
};
</script>


<style scoped>
.color-circle {
  width: 20px; /* Ajustez la taille du cercle selon vos préférences */
  height: 20px; /* Ajustez la taille du cercle selon vos préférences */
  border-radius: 50%;
  border: black solid 1px;
  display: inline-block;
  margin-left: 10px; /* Ajoutez une marge à gauche pour séparer le cercle du texte */
  vertical-align: middle; /* Alignez le cercle au milieu du texte */
}

</style>
