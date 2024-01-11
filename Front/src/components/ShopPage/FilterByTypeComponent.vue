<template>
  <div>
    <h4>{{translate("filterByTypeC_title")}}</h4>
    <div class="form-check form-switch"
         v-for="typePrestation in getAllTypePrestation"
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
import {mapActions, mapGetters, mapMutations} from 'vuex';
import {translate} from "../../lang/translationService";

export default {
  data() {
    return {
      //typePrestations : [],
      selectedTypePrestation: []
    };
  },
  async mounted() {
    try {
      await this.loadData();
      //this.typePrestations = await this.getTypePrestations();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters('prestationEtType', ['getAllTypePrestation'])
  },
  methods: {
    translate,
    ...mapActions('prestationEtType', ['getTypePrestationsStore']),
    async loadData(){
      if (this.getAllTypePrestation.length === 0){
        await this.getTypePrestationsStore()
      }
    },
    updateFilter() {
      console.log(this.selectedTypePrestation)
      this.$store.commit('prestationEtType/SET_SELECTED_TYPE_PRESTATION', this.selectedTypePrestation);
    },

    ...mapMutations(['prestationEtType/SET_SELECTED_TYPE_PRESTATION']),
  }
};
</script>