<template>
  <div>
    <h3>{{translate("filterMap_1")}}</h3>

    <h4>{{translate("filterMap_2")}}</h4>

    <div class="form-outline" v-if="$store.getters.getLang==='fr'">
      <input type="search" id="form1" class="form-control" placeholder="Chercher entreprise" aria-label="Search" @input="updateSearchQuery"/>
    </div>

    <div class="form-outline" v-else>
      <input type="search" id="form1" class="form-control" placeholder="Search company" aria-label="Search" @input="updateSearchQuery"/>
    </div>

      <h4>{{translate("filterMap_3")}}</h4>
      <div v-for="(zone, index) in getAllZone" :key="index" class="form-check">
        <input class="form-check-input" type="checkbox" :id="'zoneCheck' + index" v-model="selectedZones" :value="zone.id_zone" @change="updateFilterZone">
        <label class="d-flex gap-2 form-check-label" :for="'zoneCheck' + index">
          <span class="color-circle" :style="{ background: zone.couleur_hexa }"></span>{{ zone.libelle }}
        </label>
      </div>


    <h4>{{translate("filterMap_4")}}</h4>
    <div v-for="(type_prestation, index) in getAllTypePrestation" :key="index" class="form-check">
      <input class="form-check-input" type="checkbox" :id="'typePrestationCheck' + index" v-model="selectedTypePrestations" :value="type_prestation.id_type_prestation" @change="updateFilterTypePrestation">
      <label class="form-check-label" :for="'typePrestationCheck' + index">{{ type_prestation.libelle }}</label>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import {translate} from "../../lang/translationService";

export default {
  data() {
    return {
      //typePrestations : [],
      //zones : [],

      selectedTypePrestations:[],
      selectedZones:[],
      searchQuery: this.$store.state.searchQuery
    };
  },
  async mounted() {
    try {
      //await this.$store.dispatch('getTypePrestations');
      await this.loadData();
      //this.typePrestations = await this.getTypePrestations();
      //this.zones = await this.getZones();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters(['getSelectedTypePrestation', 'getSelectedZone', 'getAllTypePrestation', 'getAllZone']),
  },
  methods: {
    translate,
    ...mapActions(['getTypePrestationsStore', 'getZonesStore']),
    async loadData() {
      if (this.getAllTypePrestation.length === 0) {
        await this.getTypePrestationsStore();
      }
      if (this.getAllZone.length === 0) {
        await this.getZonesStore();
      }
    },
    updateFilterTypePrestation() {
      this.$store.commit('SET_SELECTED_TYPE_PRESTATION', this.selectedTypePrestations);
      console.log(this.selectedTypePrestations)
      console.log(this.$store.state.selectedTypePrestation)
    },
    updateFilterZone() {
      this.$store.commit('SET_SELECTED_ZONE', this.selectedZones);
      console.log(this.selectedZones)
      console.log(this.$store.state.selectedZone)
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
    ...mapMutations(['SET_SELECTED_TYPE_PRESTATION', 'SET_SELECTED_ZONE', 'SET_SEARCH_QUERY']),
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
