<template>
  <div>
    <h4>{{translate("filterByStandC_title")}}</h4>
    <div class="form-check form-switch"
         v-for="stand in getAllStand"
         :key="stand">
      <input class="form-check-input"
             type="checkbox"
             :value="stand.id_stand"
             v-model="selectedStands"
             @change="updateStandFilter"
             :id="'standSwitch' + stand.id_stand">
      <label class="form-check-label" :for="'standSwitch' + stand.id_stand">{{ stand.nom_stand }}</label>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import {translate} from "../../lang/translationService";

export default {
  data() {
    return {
      //stands : [],
      selectedStands: []
    };
  },
  async mounted() {
    try {
      await this.loadData();
      //this.stands = await this.getStands();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters('stands', ['getAllStand'])
  },
  methods: {
    translate,
    ...mapActions('stands', ['getStandsStore']),
    async loadData(){
      if (this.getAllStand.length === 0){
        await this.getStandsStore()
      }
    },
    updateStandFilter() {
      this.$store.commit('stands/SET_SELECTED_STANDS', this.selectedStands);
    },
    ...mapMutations('stands',['SET_SELECTED_STANDS'])
  }
};
</script>
