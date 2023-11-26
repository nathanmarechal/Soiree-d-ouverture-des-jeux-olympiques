<template>
  <div>
    <h4>Liste de mes prestations</h4>
    <table class="table">
      <thead>
      <tr>
        <th>Libellé</th>
        <th>Prix</th>
        <th>Image</th>
        <th>Type de Prestation</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(prestation, index) in prestations" :key="index">
        <td>{{ prestation.libelle }}</td>
        <td>{{ prestation.prix }}€</td>
        <td><img :src="`/path/to/images/${prestation.image}`" alt="Image" height="50"></td>
        <td>{{ prestation.type_prestation_libelle }}</td>
        <td>
          <router-link :to="{ name: 'AdminEditPrestationView', params: { id_prestation: prestation.id_prestation } }" class="btn btn-primary">Modifier</router-link>
          <button class="btn btn-danger" @click="prestationDelete(index)">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>
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

  },
}
</script>
