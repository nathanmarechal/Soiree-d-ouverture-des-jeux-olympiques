<template>
  <div class="container text-center my-5"> <!-- Ajout d'une marge verticale -->
    <h1 class="display-4 border-bottom pb-2">{{ pageTitle }}</h1>
    <!-- Bordure sous le titre et espace en dessous pour le distinguer -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: 'Ouverture des jeux de Paris'
    }
  }
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
