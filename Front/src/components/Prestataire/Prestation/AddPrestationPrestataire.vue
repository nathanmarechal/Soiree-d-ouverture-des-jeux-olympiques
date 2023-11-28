<template>
  <form @submit.prevent="submitForm" class="d-flex gap-3 flex-column justify-content-center">
    <div class="form-group">
      <label for="libelle">Libellé:</label>
      <input v-model="prestation.libelle" id="libelle" placeholder="Libellé" class="form-control">
    </div>
    <div class="form-group">
      <label for="prix">Prix:</label>
      <input v-model="prestation.prix" id="prix" type="number" step="0.01" placeholder="Prix" class="form-control">
    </div>
    <div class="form">
      <label for="image_stand">Image :</label><br>
      <input type="file" id="image_stand" @change="handleImageUpload" accept="image/*" required>
    </div>
    <div class="form-group">
      <label for="type_prestation">Type de prestation:</label>
      <select v-model="prestation.id_type_prestation" id="type_prestation" class="form-control">
        <option v-for="type in type_prestations" :key="type.id_type_prestation" :value="type.id_type_prestation">{{ type.libelle }}</option>
      </select>
    </div>
    <button type="submit" class="btn btn-success">Ajouter</button>
    <router-link to="/prestataire/prestations" class="btn btn-danger">Quitter</router-link>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { createPrestation } from "@/services/prestation.service";

export default {
  data() {
    return {
      prestation: {
        libelle: "",
        prix: null,
        image: "",
        id_type_prestation: null,
        id_stand: null,
      },
      type_prestations: [], // Remplacez par vos données de type de prestation
      stands: [], // Remplacez par vos données de stand
    };
  },
  async mounted() {
    try {
      // Chargez vos données de type de prestation et de stand ici
       this.type_prestations = await this.getTypePrestations();
      // this.stands = await fetchStands();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  methods: {
    ...mapActions(['getTypePrestations']),
    async submitForm() {
      try {
        console.log("Données de la prestation :", this.prestation);
        // Appel de la méthode createPrestation avec les données de la prestation
        const response = await createPrestation(this.prestation);

        // Gérer la réponse ici (ex : afficher un message de succès)
        console.log("Prestation créée avec succès :", response);

        // Redirection vers '/admin/prestations/'
        await this.$router.push('/admin/prestations/');
      } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de la création de la prestation :", error);
        // Afficher un message d'erreur à l'utilisateur, si nécessaire
      }
    }
  }
};
</script>
