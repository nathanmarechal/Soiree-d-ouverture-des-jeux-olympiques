<template>
  <div class="container mt-4">
    <h2>Liste des Prestations</h2>
    <div class="form-check form-switch"
         v-for="typePrestation in getallType"
         :key="typePrestation.id_type_prestation">
      <input class="form-check-input"
             type="checkbox"
             v-model="selectedTypes[typePrestation.id_type_prestation]"
             @change="updateFilter"
             :id="'flexSwitchCheck' + typePrestation.id_type_prestation">
      <label class="form-check-label" :for="'flexSwitchCheck' + typePrestation.id_type_prestation">{{ getTypePrestationLabel(typePrestation.id_type_prestation) }}</label>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getallType']),
  },
  data() {
    return {
      selectedTypes: {}
    };
  },
  methods: {
    ...mapMutations(['SET_SELECTED_TYPE']),
    updateFilter() {
      this.$store.commit('SET_SELECTED_TYPE', this.selectedTypes);
      console.log(this.$store.state.selectedTypes)
    },
    getTypePrestationLabel(idType) {
      const type = this.getallType.find(type => type.id_type_prestation === idType);
      return type ? type.libelle : 'Type inconnu';
    },
  }
};
</script>