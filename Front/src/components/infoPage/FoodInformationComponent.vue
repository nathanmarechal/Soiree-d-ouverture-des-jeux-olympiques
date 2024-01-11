<template>
  <section style="margin-top: 7%">
    <div v-for="type in getAllTypePrestation" :key="type" class="food-container">
      <div class="food-image-container">
        <img :src="getImageSrc(type.image)" class="food-img-fluid" alt="food">
      </div>
      <div class="food-text-container">
        <h3>{{type.page_title}}</h3>
        <p>{{ type.description_type_prestation }}</p>
        <button @click="goToStore(type)" class="food-overlay-button">Réserver</button>
      </div>
    </div>
  </section>
</template>


<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      //typePrestations: [],
      selectedTypePrestation: [],
    }
  },
  async mounted() {
    await this.loadData()
    //this.typePrestations = await this.getTypePrestations();
  },
  computed: {
    ...mapGetters('prestationEtType', ['getAllTypePrestation','getSelectedTypePrestation']),
  },
  methods: {
    ...mapMutations('prestationEtType', ['SET_SELECTED_TYPE_PRESTATION']),
    ...mapMutations('user', ['SET_PROVENANCE']),
    ...mapActions('prestationEtType', ['getTypePrestationsStore']),

    async loadData(){
      try {
        if (this.getAllTypePrestation.length === 0) {
          await this.getTypePrestationsStore()
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },

    updateFilterI(type) {
      let newSelection = [...this.selectedTypePrestation];

      const index = newSelection.findIndex(t => t.id_type_prestation === type.id_type_prestation);
      if (index === -1) {
        newSelection.push(type.id_type_prestation);
      } else {
        newSelection.splice(index, 1);
      }
      this.$store.commit('stands/SET_SELECTED_STANDS', []);
      this.$store.commit('prestationEtType/SET_SELECTED_TYPE_PRESTATION', []);
      this.$store.commit('prestationEtType/SET_SELECTED_TYPE_PRESTATION', newSelection);
    },

    getImageSrc(imageName) {
      try {
        return require('@/assets/infoPage/' + imageName);
      } catch {
        return require('@/assets/' + "4.png");
      }
    },

    goToStore(type){
      this.updateFilterI(type);
      this.$store.commit('user/SET_PROVENANCE', 0);
      this.$router.push({ name: 'shopView' });
    }
  },

}
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


