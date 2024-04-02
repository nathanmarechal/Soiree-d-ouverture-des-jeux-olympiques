<template>
  <div>
    <h3>{{ translate("filterMap_1") }}</h3>

    <h4>{{ translate("filterMap_3") }}</h4>
    <div>
      <label for="typeZoneSelect">{{ translate("filterMap_5") }}</label>

      <select id="typeZoneSelect" v-model="selectedTypeZone" >
        <option v-for="type in getAllTypeZone" :key="type.id_type_zone" :value="type.id_type_zone">{{ type.libelle }}</option>
      </select>
    </div>
    <div v-for="(zone, index) in filteredZones" :key="index" class="form-check" @change="updateFilterZone">
      <input class="form-check-input" type="checkbox" :id="'zoneCheck' + index" v-model="selectedZones" :value="zone.id_zone">
      <label class="d-flex gap-2 form-check-label" :for="'zoneCheck' + index">
        <span class="color-circle" :style="{ background: zone.couleur_hexa }"></span>{{ zone.libelle }}
      </label>
    </div>

    <h4>Logistics Placement Options</h4>
    <div v-for="(type, index) in getAllTypeEmplacementLogistique" :key="index" class="form-group">
      <label :for="'logistics' + type.id_type_emplacement_logistique">
        {{ type.libelle }} ({{ type.libelle_unite }}) - Max: {{ findMaxUnit(type.id_type_emplacement_logistique) }}
      </label>
      <input type="number" :id="'logistics' + type.id_type_emplacement_logistique" class="form-control"
             :max="findMaxUnit(type.id_type_emplacement_logistique)" @input="updateLogisticsRequirement(type.id_type_emplacement_logistique, $event.target.value)">
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
      logisticsRequirements: [],
      searchQuery: this.$store.state.user.searchQuery
    };
  },
  computed: {
    ...mapGetters('ZoneEtType', ['getAllZone', 'getAllTypeZone']),
    ...mapGetters('emplacementLogistiqueEtType', ['getAllTypeEmplacementLogistique', 'getAllEmplacementLogistique']),
  filteredZones() {
      if (this.selectedTypeZone) {
        return this.getAllZone.filter(zone => zone.id_type_zone === this.selectedTypeZone);
      }
      return this.getAllZone;
    }
  },
  methods: {
    translate,
    ...mapActions('ZoneEtType', ['getZonesStore','getTypeZonesStore']),
    ...mapActions('emplacementLogistiqueEtType', ['getTypeEmplacementLogistiqueStore', 'getEmplacementLogistiqueStore']),
    async loadData() {
      if (this.getAllZone.length === 0){
        await this.getZonesStore();
      }
    if (this.getAllTypeEmplacementLogistique.length === 0){
        await this.getTypeEmplacementLogistiqueStore();
      }
      if (this.getAllEmplacementLogistique.length === 0){
        await this.getEmplacementLogistiqueStore();
      }
      if (this.getAllTypeZone.length === 0) {
        await this.getTypeZonesStore();
      }
    },
    findMaxUnit(typeId) {
      // Assuming emplacementLogistique is an array of all logistics placements
      const placements = this.getAllEmplacementLogistique.filter(el => el.id_type_emplacement_logistique === typeId);
      return Math.max(...placements.map(el => el.unite));
    },
    updateFilterZone() {
      this.$store.commit('ZoneEtType/SET_SELECTED_ZONE', this.selectedZones);
},
    updateLogisticsRequirement(typeId, value) {
      const intValue = value === '' ? null : parseInt(value, 10); // Convert to integer, use null for empty strings

      if (isNaN(intValue)) {
        // Handle case where value is not a valid number
        // You might want to remove the entry, set it to null, or handle it as you see fit
        return;
      }

      const index = this.logisticsRequirements.findIndex(req => req.id === typeId);

      if (intValue === null) {
        // Remove the entry if the value is null (empty input)
        if (index !== -1) {
          this.logisticsRequirements.splice(index, 1);
        }
      } else {
        // Update or add the value
        if (index !== -1) {
          this.logisticsRequirements[index].value = intValue;
        } else {
          this.logisticsRequirements.push({ id: typeId, value: intValue });
        }
      }

      this.$store.commit('emplacementLogistiqueEtType/SET_LOGISTICS_REQUIREMENTS', this.logisticsRequirements);
    },

    ...mapMutations('ZoneEtType', ['SET_SELECTED_ZONE']),
    ...mapMutations('emplacementLogistiqueEtType', ['SET_LOGISTICS_REQUIREMENTS']),
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
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: black solid 1px;
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
}
</style>
