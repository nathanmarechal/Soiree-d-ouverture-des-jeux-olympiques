<template>
  <form @submit.prevent="submitForm" class="d-flex gap-3 flex-column justify-content-center">
    <div class="form-group">
      <label for="libelle">Libellé:</label>
      <input v-model="zone.libelle" id="libelle" placeholder="Libellé" class="form-control">
    </div>
    <div class="form-group">
      <label for="couleur_hexa">Couleur:</label>
      <input v-model="zone.couleur_hexa" id="couleur_hexa" type="color" class="form-control">
    </div>
    <div class="form-group">
      <label for="type_zone_libelle">Type de zone:</label>
      <select v-model="zone.id_type_zone" id="type_zone_libelle" class="form-control">
        <option v-for="type in type_zones" :key="type.id_type_zone" :value="type.id_type_zone">{{ type.libelle }}</option>
      </select>
    </div>
    <button type="submit" class="btn btn-success">Ajouter</button>
    <router-link to="/admin/zones/" class="btn btn-danger">Quitter</router-link>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { createZone} from "@/services/map.service";

export default {
  data() {
    return {
      zone: {
        libelle: "",
        couleur_hexa: "",
        id_type_zone: null,
      },
      type_zones: [],
    };
  },
  async mounted() {
    try {
      this.type_zones = await this.getTypesZone();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  methods: {
    ...mapActions(["getTypesZone"]),
    async submitForm() {
      try {
        console.log("Données de la zone :", this.zone);
        // Appel de la méthode createZone avec les données de la zone
        const response = await createZone(this.zone);

        // Gérer la réponse ici (ex : afficher un message de succès)
        console.log("Zone créée avec succès :", response);

        // Redirection vers '/admin/zones/'
        await this.$router.push('/admin/zones/');
      } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de la création de la zone :", error);
        // Afficher un message d'erreur à l'utilisateur, si nécessaire
      }
    }

  }
};
</script>
