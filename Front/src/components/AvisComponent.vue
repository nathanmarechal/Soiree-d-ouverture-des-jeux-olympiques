<template>
  <div class="slideshow-container">
    <div class="avis-container">
      <div class="avis-note">{{avis[index].note}}</div>
      <div class="avis-commentaire">{{avis[index].commentaire}}</div>
    </div>

    <div class="navigation">
      <button v-if="index > 0" @click="index = index - 1" class="nav-button">
        <i class="fas fa-arrow-left"></i>
      </button>

      <button v-if="index < size - 1" @click="index = index + 1" class="nav-button">
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import '@fortawesome/fontawesome-free/css/all.css';

export default {

  data() {
    return {
      avis : null,
      size : 0,
      index : 0,
    }
  },
  async mounted() {
    await this.loadData()
    this.avis = this.getAvis
    this.size = this.avis.length
    console.log(this.avis)
  },
  computed: {
    ...mapGetters(['getSelectedStands', 'getAvis']),
  },
  methods: {
    ...mapActions(['getAvisStore']),
    async loadData(){
      try {
        await this.getAvisStore(this.getSelectedStands[0]);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },

  },
}

</script>


<style scoped>
.slideshow-container {
  font-family: 'Arial', sans-serif;
  color: #333;
  text-align: center;
}

.avis-container {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.avis-note, .avis-commentaire {
  margin-bottom: 10px;
}

.navigation .nav-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.nav-button i {
  color: #333;
}

.nav-button:hover i {
  color: #007bff;
}
</style>