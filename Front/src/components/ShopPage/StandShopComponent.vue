<template>
  <div>
    <h1>Stand : {{stand.nom_stand}}     <img style="width: 200px; height: 200px;" :src="imagePath" alt="Image du stand" /></h1>
    <h2>description : {{stand.description_stand}}</h2>
    <h2>toutes les prestations proposées par {{stand.nom_stand}} :</h2>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "StandShopComponent",
  data() {
    return {
      id_stand : this.getSelectedStands,
      stand : null,
    };
  },
  computed: {
    ...mapGetters(['getSelectedStands','getAllStand']),
    imagePath() {
      return require(`@/assets/stand/${this.stand.image_stand}`);
    }

  },
  methods: {
    ...mapActions(['getStandsStore']),
    async loadData(){
      if (this.getAllStand.length === 0){
        await this.getStandsStore()
      }
    },
  },
  async created() {
    this.id_stand = this.getSelectedStands[0];
    await this.loadData();
    this.stand = this.getAllStand.find(stand => stand.id_stand === this.id_stand);

  },
};

</script>


<style scoped>

</style>