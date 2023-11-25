<template>
  <div class="container mt-4">
    <h2>Filtrer par Stand</h2>
    <div class="form-check form-switch"
         v-for="stand in stands"
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
import {mapActions, mapMutations} from 'vuex';

export default {
  //computed: {
  //  ...mapGetters(['getAllStand']),
  //},
  data() {
    return {
      stands : [],
      selectedStands: []
    };
  },
  async mounted() {
    this.stands = await this.getStands();
  },
  methods: {
    ...mapActions(['getStands']),
    updateStandFilter() {
      this.$store.commit('SET_SELECTED_STANDS', this.selectedStands);
    },
    ...mapMutations(['SET_SELECTED_STANDS'])
  }
};
</script>
