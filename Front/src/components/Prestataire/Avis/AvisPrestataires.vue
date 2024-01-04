<template>
  <div v-if="size === 0">
    <div class="alert alert-info" role="alert">
      <h4 class="alert-heading">Aucun avis</h4>
      <p>Il n'y a pas encore d'avis sur votre stand.</p>
    </div>
  </div>

  <div v-else class="container mt-4">
    <div class="row">
      <div class="col-md-4 mb-4" v-for="(item, index) in avis" :key="index">
        <div class="avis-container">
          <div class="avis-etoiles">
            <span v-for="n in 5" :key="n" class="etoile" :class="{'active': n <= item.note}">
              <i class="fas fa-star"></i>
            </span>
          </div>
          <div class="mt-2"><strong>{{ item.prenom }} {{ item.nom }}</strong></div>
          <div class="avis-commentaire" v-html="item.commentaire"></div>
        </div>
      </div>
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
      addMode : false,
    }
  },
  async mounted() {
    await this.loadData()
    this.avis = this.getAvis
    this.size = this.avis.length
  },
  computed: {
    ...mapGetters(['getSelectedStands', 'getAvis', "getCurrentUser"]),
  },
  methods: {
    ...mapActions(['getAvisStore', "uploadAvisStore", "deleteAvisStore"]),
    async loadData(){
      try {
        await this.getAvisStore(this.getCurrentUser.id_stand);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
  },
}

</script>


<style scoped>

.slideshow-container {
  margin-top: 15%;
  margin-bottom: 15%;
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

.avis-etoiles {
  color: #ccc; /* Couleur des étoiles inactives */
}

.etoile {
  cursor: pointer;
  transition: color 0.2s;
}

.etoile.active {
  color: #ffd700; /* Couleur des étoiles actives */
}
</style>