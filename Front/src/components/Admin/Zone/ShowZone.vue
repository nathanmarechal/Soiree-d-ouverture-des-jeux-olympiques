<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th>ID Zone</th>
        <th>Libellé</th>
        <th>Couleur</th>
        <th>ID Type Zone</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(zone, index) in zones" :key="index">
        <td>{{ zone.id_zone }}</td>
        <td>{{ zone.libelle }}</td>
        <td>
          <div class="color-box" :style="{ backgroundColor: zone.couleur_hexa }"></div>
        </td>
        <td>{{ zone.id_type_zone }}</td>
        <td>
          <button class="btn btn-primary" @click="editZone(index)">Modifier</button>
          <button class="btn btn-danger" @click="deleteZone(index)">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['zones']), // Récupération de l'état du store Vuex
  },
  methods: {
    ...mapActions(['getZones']),
  },
  mounted() {
    this.getZones(); // Appel de l'action Vuex pour peupler le state 'zones'
  }
}
</script>


<style scoped>
/* Styles pour les boutons et autres éléments si nécessaire */
.blue-button {
  /* Style pour le bouton bleu */
}
.red-button {
  /* Style pour le bouton rouge */
}
</style>



