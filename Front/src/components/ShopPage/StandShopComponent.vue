<template>
  <div>
    <div class="food-container">
      <!-- Move the image container above the text container -->
      <div  class="food-image-container">
        <img :src="imagePath" class="food-img-fluid" alt="stand">
      </div>
      <div class="food-text-container">
        <h3>{{stand.nom_stand}}</h3>
        <p>{{ stand.description_stand }}</p>
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
      if (this.stand) {
        return require(`@/assets/stand/${this.stand.image_stand}`);
      } else {
        return require(`@/assets/arthur-clown.png`); // replace with your default image path
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  margin-bottom: 2%;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  position: relative; /* Nécessaire pour positionner correctement le pseudo-élément */
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

.food-image-container {
  flex: 1;
  position: relative;
  height: 100%;
}

.food-img-fluid {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.food-text-container {
  flex: 1;
  position: relative;
  padding: 20px;
  max-width: 45%;
  color: black;
  font-size: 24px;
  text-align: justify;
  background-color: rgba(255, 255, 255, 0.5);
}

.food-overlay-text {
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  margin: 0;
}

.food-overlay-button {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #D8C17B;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.food-overlay-button:hover {
  background-color: #a09860;
}
</style>
