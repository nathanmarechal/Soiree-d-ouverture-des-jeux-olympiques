<template>

  <form @submit.prevent="submitForm" class="d-flex gap-3 flex-column justify-content-center" style="width: 50vh;">
    <div class="form-group">
      <label for="libelle">Libellé:</label>
      <input v-model="prestation.libelle" id="libelle" placeholder="Libellé" class="form-control">
    </div>
    <div class="form-group">
      <label for="prix">Prix:</label>
      <input v-model="prestation.prix" id="prix" type="number" step="0.01" placeholder="Prix" class="form-control">
    </div>
    <div class="form-group">
      <label for="type_prestation">Type de prestation:</label>
      <select v-model="prestation.id_type_prestation" id="type_prestation" class="form-control">
        <option v-for="type in getAllTypePrestation" :key="type.id_type_prestation" :value="type.id_type_prestation">{{ type.libelle }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="isAvailable">Est disponible:</label>
      <input v-model="prestation.is_available" id="isAvailable" type="checkbox" class="form-check-input">
    </div>
    <div class="form">
      <label for="image_stand">Image :</label><br>
      <input type="file" id="image_stand" @change="handleImageUpload" accept="image/*">
    </div>
    <div v-if="croppedImage">
      <img :src="croppedImage" class="cropped-image" style="width: 100%;border-radius: 15%;" />
    </div>
    <div v-if="isImageInputUpload" class="d-flex flex-column gap-3 justify-content-center">
      <img ref="image" class="cropper-image" style=""/>
      <button  type="button" @click="cropImage" class="btn btn-primary">Recadrer l'image</button>
    </div>
    <button type="submit" class="btn btn-success">Mettre à jour</button>
    <router-link to="/prestataire/prestations" class="btn btn-danger">Quitter</router-link>

    {{prestation}}

  </form>
</template>

<script>
//import Cropper from 'cropperjs';
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ["selected_prestation"],
  data() {
    return {
      croppedImage: null,
      isImageInputUpload: false,
      image_raw: false,
      cropper: null,
      prestation: {
        libelle: "",
        prix: null,
        image: null,
        id_type_prestation: null,
        id_stand: null,
        is_available: false
      },
    };
  },
  computed: {
    ...mapGetters(['getAllTypePrestation', 'getCurrentUser']),
  },
  async mounted() {
    this.prestation = { ...this.selected_prestation };
    if (this.prestation.image) {
      // Chargement de l'image existante
      this.croppedImage = require('./../../../../../Back/assets/prestation/' + this.prestation.image)
    }
    await this.loadData();
  },
  methods: {
    ...mapActions(['updatePrestationStore']), // Ajoutez votre action Vuex pour la mise à jour
  /*  async loadData() {
      // Logique de chargement des données supplémentaires si nécessaire
    },
    handleImageUpload(event) {
      // La même logique que dans le composant d'ajout
    },
    initializeCropper() {
      // La même logique que dans le composant d'ajout
    },
    cropImage() {
      // La même logique que dans le composant d'ajout
    },
    */

    async submitForm() {
      try {
        console.log("Mise à jour de la prestation :", this.prestation);
        await this.updatePrestationStore(this.prestation);
        if (this.croppedImage && this.isImageInputUpload) {
          // Logique d'upload de l'image modifiée
        }
        this.$router.push('/prestataire/prestations/');
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la prestation :", error);
      }
    }
  }
};
</script>

<style scoped>
@import 'cropperjs/dist/cropper.css';
/* Autres styles si nécessaire */
</style>
