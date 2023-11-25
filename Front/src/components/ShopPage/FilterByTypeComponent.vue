<template>
  <div class="container mt-4">
    <h2>Liste des Types de prestations</h2>
    <div class="form-check form-switch"
         v-for="typePrestation in typePrestations"
         :key="typePrestation">
      <input class="form-check-input"
             type="checkbox"
             :value="typePrestation.id_type_prestation"
             v-model="selectedTypePrestation"
             @change="updateFilter"
             :id="'flexSwitchCheck' + typePrestation.id_type_prestation">
      <label class="form-check-label" :for="'flexSwitchCheck' + typePrestation.id_type_prestation">{{ typePrestation.libelle }}</label>
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
      console.log(this.selectedTypePrestation)
      this.$store.commit('SET_SELECTED_TYPE_PRESTATION', this.selectedTypePrestation);
    },

    ...mapMutations(['SET_SELECTED_TYPE_PRESTATION']),
  }
};
</script>