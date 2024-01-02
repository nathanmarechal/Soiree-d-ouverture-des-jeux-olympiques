<template>
  <div>
    <div v-if="addMode===true">
      <add-avis-component @contentSaved="addMode = false"></add-avis-component>
    </div>
    <div v-else>
      <div>
        <button v-if="getCurrentUser.session_id !== null && getCurrentUser.id_user !== null" class="btn btn-outline-info" @click="setActiveAddMode"> ajouter un avis</button>
      </div>
  <div class="slideshow-container" >
    <div class="avis-container">
      <div class="avis-etoiles">
        <span v-for="n in 5" :key="n" class="etoile" :class="{'active': n <= avis[index].note}">
          <i class="fas fa-star"></i>
        </span>
      </div>
      <div>{{avis[index].prenom}} {{avis[index].nom}}</div>
      <div class="avis-commentaire" v-html="avis[index].commentaire"></div>
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
  </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import '@fortawesome/fontawesome-free/css/all.css';
import AddAvisComponent from "@/components/AddAvisComponent.vue";

export default {
  components: {AddAvisComponent},

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
    ...mapActions(['getAvisStore', "uploadAvisStore"]),
    async loadData(){
      try {
        await this.getAvisStore(this.getSelectedStands[0]);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    setActiveAddMode() {
      this.addMode = true;
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