<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th>ID Zone</th>
        <th>Libellé</th>
        <th>Couleur</th>
        <th>Type Zone</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(zone, index) in zones" :key="index">
        <td>{{ zone.id_zone }}</td>
        <td>{{ zone.libelle }}</td>
        <td>
          <div class="cercle" :style="{ background: zone.couleur_hexa }"></div>
        </td>
        <td>{{ zone.type_zone_libelle }}</td>
        <td>
          <router-link :to="{ name: 'AdminEditZoneView', params: { id_zone: zone.id_zone } }" class="btn btn-primary">Modifier</router-link>
          <button class="btn btn-danger" @click="deleteZone(index)">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  //computed: {
  //  ...mapState(['zones']), // Récupération de l'état du store Vuex
  //},
  data () {
    return {
      zones: [],
    }
  },
  async created() {
    this.zones = await this.getZones()
  },
  methods: {
    ...mapActions(['getZones']),
  },
}
</script>


<style scoped>
.cercle {
  width: 2vh;
  height: 2vh;
  border-radius: 50%; /* Pour un cercle parfait */
  border: 2px solid black; /* Optionnel, pour une bordure subtile */
  display: inline-block; /* Assure que le div se comporte comme un élément en ligne */
}
</style>



