<template>
  <div>
    <div class="food-container">
      <img :src="imagePath" class="food-img-fluid" alt="stand">
      <div class="food-text-container">
        <h3>{{stand.nom_stand}}</h3>
        <div v-html="stand.description_stand"></div>
      </div>
      <map-one-area :stand="this.stand"></map-one-area>
    </div>
    <h2>Toutes les prestations proposées par {{stand.nom_stand}} :</h2>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MapOneArea from "@/components/ShopPage/MapOneArea.vue";

export default {
  name: "StandShopComponent",
  components: {
    MapOneArea
  },
  data() {
    return {
      id_stand : this.getSelectedStands,
      stand : null,
    };
  },
  computed: {
    ...mapGetters(['getSelectedStands','getAllStand']),
    imagePath() {
      if (this.stand) {
        return require(`./../../../../Back/assets/stand/profile/${this.stand.image_stand}`);
      } else {
        return require(`@/assets/clown.png`); // replace with your default image path
      }
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
.food-container {
  width: 100%;
  display: flex;
  gap: 2vh;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 2%;
  background-color: rgba(255, 255, 255, 0.5);
}

.food-image-container::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 10%; /* Largeur du dégradé */
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
  /* Ajustez les couleurs du dégradé selon vos besoins */
}


.food-img-fluid {
  height: 25vh;
  width: 25vh;
  border-radius: 20%;
}

.food-text-container {
  color: black;
  font-size: 24px;
  text-align: justify;
  background-color: rgba(255, 255, 255, 0.5);
}

</style>
