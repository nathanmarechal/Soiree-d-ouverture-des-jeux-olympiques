<template>

  <form @submit.prevent="submitForm" class="d-flex gap-3 flex-column justify-content-center" style="width: 50vh;">
    <div class="form-group">
      <label for="libelle">{{ translate("editPrestationPrestataire_1") }}</label>
      <input v-model="prestation.libelle" id="libelle" placeholder="Libellé" class="form-control">
    </div>
    <div class="form-group">
      <label for="prix">{{ translate("editPrestationPrestataire_2") }}</label>
      <input v-model="prestation.prix" id="prix" type="number" step="0.01" :placeholder="translate('editPrestationPrestataire_2.5')" class="form-control">
    </div>
    <div class="form-group">
      <label for="type_prestation">{{translate("editPrestationPrestataire_3")}}</label>
      <select v-model="prestation.id_type_prestation" id="type_prestation" class="form-control">
        <option v-for="type in getAllTypePrestation" :key="type.id_type_prestation" :value="type.id_type_prestation">{{ type.libelle }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="isAvailable">{{translate("editPrestationPrestataire_4")}}</label>
      <input v-model="prestation.is_available" id="isAvailable" type="checkbox" class="form-check-input">
    </div>
    <img v-if="!isImageInputUpload" :src="getImageSrc(prestation.image)" alt="Image de la prestation" class="card-img-top" style="border-radius: 10%;">

    <div v-if="croppedImage">
      <img :src="croppedImage" class="cropped-image" style="width: 100%; border-radius: 15%;" />
    </div>

    <!-- Bouton pour l'upload d'image -->
    <button type="button" @click="toggleImageUpload" class="btn btn-primary">{{translate("editPrestationPrestataire_5")}}</button>


    <div v-if="isImageInputUpload" class="d-flex flex-column gap-3 justify-content-center">

      <img ref="image" class="cropper-image" style=""/>
      <input type="file" id="image_stand" @change="handleImageUpload" accept="image/*">
      <button type="button" @click="cropImage" class="btn btn-primary">{{translate("editPrestationPrestataire_6")}}</button>
    </div>


    <button type="submit" class="btn btn-success">{{translate("editPrestationPrestataire_7")}}</button>
    <router-link to="/prestataire/prestations" class="btn btn-danger">{{translate("editPrestationPrestataire_8")}}</router-link>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Cropper from "cropperjs";
import {uploadImagePresation} from "@/services/prestation.service";
import {translate} from "../../../lang/translationService";
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
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors de l’exécution de mounted :', error);
    }
  },

  methods: {
    translate,
    ...mapActions(['updatePrestationStore','getTypePrestationsStore']), // Ajoutez votre action Vuex pour la mise à jour

    async loadData() {
      // Load selected prestation
      this.prestation = await this.selected_prestation;
      console.log(this.prestation.image);

      // Load type prestations if not already loaded
      if (this.getAllTypePrestation.length === 0) {
        await this.getTypePrestationsStore();
      }
    },
    getImageSrc(imageName) {
      try {
        return require('./../../../../../Back/assets/prestation/' + imageName)
      } catch {
        return require('@/assets/clown.png'); // Image par défaut en cas d'erreur
      }
    },

    handleImageUpload(event) {
      this.croppedImage = null;
      const file = event.target.files[0];
      const reader = new FileReader();
      this.isImageInputUpload = true;

      // Stocker le nom du fichier original sans l'extension

      reader.onload = (e) => {
        this.$refs.image.src = e.target.result;
        this.initializeCropper();
      };
      reader.readAsDataURL(file);
    },
    initializeCropper() {
      const image = this.$refs.image;
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 3,
        zoomable:true,
        scalable:true

      });
    },
    cropImage() {
      const croppedCanvas = this.cropper.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        const timestamp = Math.floor(Date.now() / 1000); // Temps en Unix
        const fileName = `prestation_${timestamp}.jpeg`;
        this.prestation.image=fileName;

        // Créer un nouveau fichier à partir du blob
        const file = new File([blob], fileName, { type: 'image/jpeg' });

        const url = URL.createObjectURL(file);
        this.croppedImage = url;
        this.image_raw = file;
        this.cropper.destroy();
        this.isImageInputUpload = false;
        console.log(fileName)
      });
    },
    async submitForm() {
      try {

        console.log(this.prestation.image)

        this.prestation.prix = parseFloat(this.prestation.prix);

        await uploadImagePresation(this.image_raw);

        await this.updatePrestationStore(this.prestation)


        await this.$router.push('/prestataire/prestations/');
      } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de la création de la prestation :", error);
        // Afficher un message d'erreur à l'utilisateur, si nécessaire
      }
    },
    toggleImageUpload() {
      this.isImageInputUpload = !this.isImageInputUpload;
    },
  }
};
</script>

<style scoped>
@import 'cropperjs/dist/cropper.css';
</style>
