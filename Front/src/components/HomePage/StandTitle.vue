<template>
  <div class="container text-center my-5">
    <h1 class="display-4 border-bottom pb-2">{{ translate("stand_title") }}</h1>
  </div>
</template>

<script>
import {translate} from "../../lang/translationService";

export default {
  methods: {translate},
}
</script>

<style scoped>
h1.display-4 {
  color: #343a40; /* Couleur du texte sombre */
  font-weight: bold; /* Gras pour mettre en avant le titre */
  letter-spacing: 1px; /* Espace entre les lettres pour une meilleure lisibilité */
}

/* Vous pouvez ajouter ou ajuster d'autres styles selon vos préférences */
</style>
