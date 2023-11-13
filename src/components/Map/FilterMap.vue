<template>
  <div style="border: solid; padding: 1vh">
    <h3>Filtre</h3>

    <h4>Prix</h4>

    <label for="minPrice">Prix minimum :</label>
    <input type="number" id="minPrice" v-model="minPrice" min="0">

    <label for="maxPrice">Prix maximum :</label>
    <input type="number" id="maxPrice" v-model="maxPrice" min="0">

    <p>Plage de prix : {{ minPrice }} € - {{ maxPrice }} €</p>

    <h4>Entreprise</h4>
    <div class="form-outline">
      <input type="search" id="form1" class="form-control" placeholder="Chercher entreprise" aria-label="Search"/>
    </div>

    <h4>Zone</h4>
    <div v-for="(zone, index) in zones" :key="index" class="form-check">
      <input class="form-check-input" type="checkbox" :id="'zoneCheck' + index" v-model="selectedZones" :value="zone.libelle">
      <label class="form-check-label" :for="'zoneCheck' + index">{{ zone.libelle }}</label>
    </div>

    <h4>Type de prestation</h4>
    <div v-for="(type_prestation, index) in type_prestations" :key="index" class="form-check">
      <input class="form-check-input" type="checkbox" :id="'typePrestationCheck' + index" v-model="selectedTypePrestations" :value="type_prestation.libelle">
      <label class="form-check-label" :for="'typePrestationCheck' + index">{{ type_prestation.libelle }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    zones: {
      type: Array,
      required: true
    },
    type_prestations: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      minPrice: 0,
      maxPrice: 100,
      selectedZones: [],
      selectedTypePrestations: []
    };
  },
};
</script>

<style scoped>
/* Ajoutez ici les styles CSS spécifiques si nécessaire */
</style>
