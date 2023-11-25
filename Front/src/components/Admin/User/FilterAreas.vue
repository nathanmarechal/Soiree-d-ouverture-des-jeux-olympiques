<template>
  <div>
    <h3>Filtre</h3>

    <h4>Type de zone</h4>
    <div v-for="(typeZones, index) in typeZone" :key="index" class="form-check">
      <input class="form-check-input" type="checkbox" :id="'zoneCheck' + index" v-model="selectedTypeZones" :value="typeZones.id_type_zone" @change="updateFilterTypeZone">
      <label class="form-check-label" :for="'zoneCheck' + index">{{ typeZones.libelle }}</label>
    </div>

    <h4>Zone</h4>
    <div v-for="(zone, index) in zones" :key="index" class="form-check">
      <input class="form-check-input" type="checkbox" :id="'zoneCheck' + index" v-model="selectedZones" :value="zone.id_zone" @change="updateFilterZone">
      <label class="form-check-label" :for="'zoneCheck' + index">{{ zone.libelle }}</label>
    </div>

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {

  created(){
      this.$store.dispatch('getZones');
      this.$store.dispatch('getTypeZone');
  },

  computed: {
    ...mapState(['zones', 'typeZone']),
  },
  data() {
    return {
      selectedTypeZones:[],
      selectedZones:[],
    };
  },
  methods: {
    ...mapMutations(['SET_SELECTED_TYPE_ZONES', 'SET_SELECTED_ZONE']),

  updateFilterZone() {
    this.$store.commit('SET_SELECTED_ZONE', this.selectedZones);
    console.log(this.selectedZones)
  },
    updateFilterTypeZone(){
      this.$store.commit('SET_SELECTED_TYPE_ZONES', this.selectedTypeZones);
      console.log(this.selectedTypeZones)

    }
  }
};
</script>

<style scoped>
/* Ajoutez ici les styles CSS spécifiques si nécessaire */
</style>
