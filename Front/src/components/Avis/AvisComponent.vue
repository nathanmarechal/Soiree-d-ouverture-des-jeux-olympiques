<template>
  <div>
    <div v-if="size === 0">
      <div class="alert alert-info" role="alert" v-if="addMode===false">
        Aucun avis pour ce stand
        <button v-if="getCurrentUser.session_id !== null && getCurrentUser.id_user !== null && addMode === false" class="btn btn-outline-success" @click="setActiveAddMode" style="margin-left: 50%"> ajouter un avis</button>
      </div>
      <div v-if="addMode===true">
        <template>cool</template>
        <add-avis-component @contentSaved="validAdd"></add-avis-component>
      </div>
    </div>
    <div v-else>
      <div v-if="addMode===true">
        <add-avis-component @contentSaved="validAdd"></add-avis-component>
      </div>
      <div v-else>
        <div>
          <button v-if="getCurrentUser.session_id !== null && getCurrentUser.id_user !== null" class="btn btn-outline-info" @click="setActiveAddMode"> ajouter un avis</button>
          <button v-if="getCurrentUser.session_id !== null && getCurrentUser.id_user !== null && getCurrentUser.id_role === 1" class="btn btn-outline-danger"  style="margin-left: 2%" @click="deleteAvis(avis[index].id_avis_stand_utilisateur)"> supprimer cet avis</button>
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
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import '@fortawesome/fontawesome-free/css/all.css';
import AddAvisComponent from "@/components/Avis/AddAvisComponent.vue";

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
    ...mapGetters('avis', ['getAvis']),
    ...mapGetters('user', ['getCurrentUser']),
    ...mapGetters('stands', ['getSelectedStands']),
  },
  methods: {
    ...mapActions('avis', ['getAvisStore', "deleteAvisStore"]),
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
    async validAdd() {
      await this.getAvisStore(this.getSelectedStands[0]);
      this.avis = this.getAvis
      this.size = this.avis.length
      this.addMode = false;
    },

    async deleteAvis(id) {
      await this.deleteAvisStore(id)
      if(this.index === this.size - 1){
        this.index = this.index - 1
      }
      this.avis = this.getAvis
      this.size = this.avis.length
    }
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