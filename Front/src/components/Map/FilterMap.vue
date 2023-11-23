<template>
  <div>
    <h3>Filtre</h3>

    <h4>Entreprise</h4>
    <div class="form-outline">
      <input type="search" id="form1" class="form-control" placeholder="Chercher entreprise" aria-label="Search" @input="updateSearchQuery"/>
    </div>

    <h4>Zone</h4>
    <div v-for="(zone, index) in getAllZone" :key="index" class="form-check">
      <input class="form-check-input" type="checkbox" :id="'zoneCheck' + index" v-model="selectedZones" :value="zone.id_zone" @change="updateFilterZone">
      <label class="form-check-label" :for="'zoneCheck' + index">{{ zone.libelle }}</label>
    </div>


    <h4>Type de prestation</h4>
    <div v-for="(type_prestation, index) in getAllTypePrestation" :key="index" class="form-check">
      <input class="form-check-input" type="checkbox" :id="'typePrestationCheck' + index" v-model="selectedTypePrestations" :value="type_prestation.id_type_prestation" @change="updateFilterTypePrestation">
      <label class="form-check-label" :for="'typePrestationCheck' + index">{{ type_prestation.libelle }}</label>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      selectedTypePrestations:[],
      selectedZones:[],
      minPrice: this.$store.state.minPrice,
      maxPrice: this.$store.state.maxPrice,
      searchQuery: this.$store.state.searchQuery
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch('getTypePrestations');
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters(['getAllTypePrestation', 'getSelectedType','getAllZone', 'getSelectedZone']),

  },
  methods: {
    ...mapMutations(['SET_SELECTED_TYPE', 'SET_SELECTED_ZONE','SET_MIN_PRICE','SET_MAX_PRICE','SET_SEARCH_QUERY']),
    updateFilterTypePrestation() {
      this.$store.commit('SET_SELECTED_TYPE', this.selectedTypePrestations);
      console.log(this.selectedTypePrestations),
      console.log(this.$store.state.selectedType)
    },
    updateFilterZone() {
      this.$store.commit('SET_SELECTED_ZONE', this.selectedZones);
      console.log(this.selectedZones)
    },
    updateMinPrice(newVal) {
      this.$store.commit('SET_MIN_PRICE', newVal);
    },
    updateMaxPrice(newVal) {
      this.$store.commit('SET_MAX_PRICE', newVal);
    },
    updateSearchQuery(event) {
      console.log(event); // Pour déboguer et voir l'objet de l'événement
      if (event && event.target && event.target.value !== undefined) {
        const searchValue = event.target.value;
        this.$store.commit('SET_SEARCH_QUERY', searchValue);
        console.log('inside filter: ' + searchValue);
      } else {
        console.log('Erreur : L\'événement ou la valeur de l\'événement est undefined');
      }
    },
  },
};
</script>

<style scoped>
/* Ajoutez ici les styles CSS spécifiques si nécessaire */
</style>
