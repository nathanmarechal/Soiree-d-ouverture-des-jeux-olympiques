<template>
  <div class="d-flex flex-row flex-wrap gap-3 justify-content-center">
    <div v-for="prestation in prestations" :key="prestation.id" class="card border" style="width: 18vh; height: 25%;">
      <img class="card-img-top" :src="getImageUrl(prestation.stand.image)" style="border-radius: 50%;" alt="Card image cap">
      <div class="card-body text-center">
        <h5 class="card-title">{{ prestation.stand.nom }}</h5>
        <p class="card-text">{{ prestation.stand.description }}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">produit : {{ prestation.libelle }}</li>
        <li class="list-group-item">prix : {{ prestation.prix }}€</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prestations: {
      type: Array,
      required: true
    }
  },
  methods: {
    getImageUrl(imageName) {
      return require(`@/assets/${imageName}`);
    }
  }
};
</script>

<style scoped>
/* Styles spécifiques au composant ici */

/* Ajustez la taille des cartes pour qu'elles s'adaptent à l'écran */
.card {
  border: 50px solid #ddd; /* Style de bordure personnalisé */
}

/* Ajustez la taille des images */
.card-img-top {
}
</style>
