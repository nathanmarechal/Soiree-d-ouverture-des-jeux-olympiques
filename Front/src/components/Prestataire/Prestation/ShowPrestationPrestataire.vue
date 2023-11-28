<template>
  <div>
    <h4>Liste de mes prestations</h4>
    <div class="display-card">
      <div class="card-main" v-for="prestation in prestations" :key="prestation.id_prestation">
        <div class="card" style="border-radius: 3vh">
          <img :src="getImageSrc(prestation.image)" alt="Image de la prestation" class="card-img-top">
          <div class="card-body">
            <h5 class="card-text">{{ prestation.libelle }}</h5>
            <p class="card-text">Prix : {{ prestation.prix }} €</p>
            <p class="card-text">{{ prestation.type_prestation_libelle }}</p>
            <div class="d-flex justify-content-center">
              <router-link :to="{ name: 'AdminEditPrestationView', params: { id_prestation: prestation.id_prestation } }" class="btn btn-primary">Modifier</router-link>
              <button class="btn btn-danger" @click="prestationDelete(prestation.id_prestation)">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { mapGetters } from 'vuex';
import { getPrestationByUserId } from '@/services/prestation.service';

export default {
  data () {
    return {
      prestations: [],
    }
  },
  computed: {
    ...mapGetters(['getCurrentUser']),
  },
  async created() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const userId = this.getCurrentUser.id_user; // ou toute autre propriété pertinente
        this.prestations = await getPrestationByUserId(userId);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    getImageSrc(imageName) {
      try {
        return require('@/assets/' + imageName);
      } catch {
        return require('@/assets/arthur-clown.png'); // Image par défaut en cas d'erreur
      }
    },
  },
}
</script>

<style scoped>

.display-card{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1vh;
}

.card-main{
  width: 20vh;
}
.card-img-top {
  width: 100%;    /* Hauteur maximale de l'image */
  object-fit: cover;   /* Garde l'aspect ratio tout en remplissant le cadre */
  border-radius: 3vh;
}


.card-body{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1vh;
}
.card-text {
  text-align: center;
}
</style>


