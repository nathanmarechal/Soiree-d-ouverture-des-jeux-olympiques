<template>
  <div class="container mt-4">
    <h2>Liste des Types de prestations</h2>
    <div class="form-check form-switch"
         v-for="typePrestation in typePrestations"
         :key="typePrestation.id_type_prestation">
      <input class="form-check-input"
             type="checkbox"
             :value="typePrestation.id_type_prestation"
             v-model="selectedTypePrestation"
             @change="updateFilter"
             :id="'flexSwitchCheck' + typePrestation.id_type_prestation">
      <label class="form-check-label" :for="'flexSwitchCheck' + typePrestation.id_type_prestation">{{ getTypePrestationLabel(typePrestation.id_type_prestation) }}</label>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex';

export default {
  //computed: {
  //  ...mapGetters(['getAllTypePrestation']),
  //},
  data() {
    return {
      typePrestations : [],
      selectedTypePrestation: []
    };
  },
  async mounted() {
    this.typePrestations = await this.getTypePrestations();
  },
  methods: {
    ...mapActions(['getTypePrestations']),
    updateFilter() {
      this.$store.commit('SET_SELECTED_TYPE_PRESTATION', this.selectedTypePrestation);
    },
    getTypePrestationLabel(idType) {
      const type = this.typePrestations.find(type => type.id_type_prestation === idType);
      return type ? type.libelle : 'Type inconnu';
    },
    ...mapMutations(['SET_SELECTED_TYPE_PRESTATION']),
  }
};
</script>
