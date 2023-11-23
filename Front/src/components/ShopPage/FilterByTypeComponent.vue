<template>
  <div class="container mt-4">
    <h2>Liste des Types de prestations</h2>
    <div class="form-check form-switch"
         v-for="typePrestation in getAllTypePrestation"
         :key="typePrestation.id_type_prestation">
      <input class="form-check-input"
             type="checkbox"
             :value="typePrestation.id_type_prestation"
             v-model="selectedTypes"
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
    ...mapGetters(['getAllTypePrestation']),
  },
  data() {
    return {
      selectedTypes: []
    };
  },
  methods: {
    ...mapMutations(['SET_SELECTED_TYPE']),
    updateFilter() {
      this.$store.commit('SET_SELECTED_TYPE', this.selectedTypes);
    },
    getTypePrestationLabel(idType) {
      const type = this.getAllTypePrestation.find(type => type.id_type_prestation === idType);
      return type ? type.libelle : 'Type inconnu';
    },
  }
};
</script>
