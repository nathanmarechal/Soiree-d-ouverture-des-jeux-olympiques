<template>
  <div class="container mt-4">
    <h2>Liste des Prestations</h2>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="prestation in allPrestations" :key="prestation.id_prestation">
        <div class="card">
          <img :src="require('@/assets/' + prestation.image)" class="card-img-top" alt="Image de la prestation">
          <div class="card-body">
            <h5 class="card-title">{{ prestation.libelle }}</h5>
            <p class="card-text">Prix : {{ prestation.prix }}</p>
            <p class="card-text">Type : {{ getTypePrestation(prestation.id_type_prestation) }}</p>
            <p class="card-text">Stand : {{ prestation.id_stand }}</p>
            <p class="card-text">Créneau : {{ prestation.creneau_horaire }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['allPrestations'])
  },
  methods: {
    getTypePrestation(idType) {
      // Logique pour retourner le libellé du type de prestation
      // en fonction de l'idType. À adapter selon la structure de vos données.
      const typePrestationMap = {
        1: 'Sport',
        2: 'Nourriture',
        3: 'Boisson',
        4: 'Magasin',
        5: 'Billetterie',
        6: 'Fanzone',
        7: 'RATP'
      };
      return typePrestationMap[idType] || 'Type Inconnu';
    }
  }
}
</script>


<style scoped>

</style>