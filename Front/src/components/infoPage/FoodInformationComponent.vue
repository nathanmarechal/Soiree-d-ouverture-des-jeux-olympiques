<template>
  <section>
  <div v-for="type in typePrestations" :key="type">
  <div  class="food-image-container">
    <img :src="getImageSrc(type.image)" alt="Background" class="food-img-fluid w-100 h-100">
    <div class="food-overlay-text">
      <h3>{{type.libelle}}</h3>
      <p>{{ type.description_type_prestation }}</p>
      <button @click="goToStore(type)" class="food-overlay-button" > Réserver </button>
    </div>
  </div>
  </div>
  </section>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      typePrestations: [],
      selectedTypePrestation: [],
    }
  },
  async mounted() {
    this.typePrestations = await this.getTypePrestations();
  },
  methods: {
    ...mapGetters(['getSelectedTypePrestation']),
    ...mapMutations(['SET_PROVENANCE', "SET_SELECTED_TYPE_PRESTATION"]),
    ...mapActions(['getTypePrestations']),

    updateFilterI(type) {
      let newSelection = [...this.selectedTypePrestation];

      // Vérifier si le type est déjà sélectionné
      const index = newSelection.findIndex(t => t.id_type_prestation === type.id_type_prestation);
      if (index === -1) {
        // Ajouter le type s'il n'est pas déjà sélectionné
        newSelection.push(type.id_type_prestation);
      } else {
        // Retirer le type s'il est déjà sélectionné
        newSelection.splice(index, 1);
      }
      this.$store.commit('SET_SELECTED_STANDS', []);
      this.$store.commit('SET_SELECTED_TYPE_PRESTATION', []);
      this.$store.commit('SET_SELECTED_TYPE_PRESTATION', newSelection);
    },

    getImageSrc(imageName) {
      try {
        return require('@/assets/infoPage/' + imageName);
      } catch {
        return require('@/assets/' + "4.png");
      }
    },

    goToStore(type){
      this.updateFilterI(type);  // Mettre à jour la sélection
      this.$store.commit('SET_PROVENANCE', 0); // Autres logiques
      this.$router.push({ name: 'shopView' }); // Naviguer vers la nouvelle route
    }
  },

}
</script>

<style scoped>
.food-image-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.food-img-fluid {
  object-fit: cover;
}

.food-overlay-text {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 5px;
  max-width: 45%;
  color: white;
  font-size: 24px;
  margin: 0;
  text-align: justify;
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
