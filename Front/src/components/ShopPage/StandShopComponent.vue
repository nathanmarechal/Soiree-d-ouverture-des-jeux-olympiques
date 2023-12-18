<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <h1 style="font-size: 500%">Stand : {{stand.nom_stand}}</h1>
        <p style="font-size: 200%"> {{stand.description_stand}}</p>
      </div>
      <div class="col-md-6 d-flex justify-content-center align-items-center">
        <img :src="imagePath" alt="Image du stand" class="img-fluid" style="width: 80%; height: 80%;">
      </div>
    </div>
    <h2>Toutes les prestations proposées par {{stand.nom_stand}} :</h2>

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