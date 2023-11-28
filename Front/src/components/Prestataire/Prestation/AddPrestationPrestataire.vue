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
        <option v-for="type in type_prestations" :key="type.id_type_prestation" :value="type.id_type_prestation">{{ type.libelle }}</option>
      </select>
    </div>
    <div class="form">
      <label for="image_stand">Image :</label><br>
      <input type="file" id="image_stand" @change="handleImageUpload" accept="image/*" required>
    </div>
    <div v-if="croppedImage">
      <img :src="croppedImage" class="cropped-image" style="width: 100%;border-radius: 15%;" />
    </div>
    <div v-if="isImageInputUpload" class="d-flex flex-column gap-3 justify-content-center">
      <img ref="image" class="cropper-image" style=""/>
      <button  type="button" @click="cropImage" class="btn btn-primary">Recadrer l'image</button>
    </div>
    <button type="submit" class="btn btn-success">Ajouter</button>
    <router-link to="/prestataire/prestations" class="btn btn-danger">Quitter</router-link>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { createPrestation } from "@/services/prestation.service";
import Cropper from 'cropperjs';


export default {
  data() {
    return {
      croppedImage: null,
      isImageInputUpload: false,
      prestation: {
        libelle: "",
        prix: null,
        imageName: '',
        image_raw:null,
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
    destroyed() {
      if (this.cropper) {
        this.cropper.destroy();
      }
    },
    handleImageUpload(event) {
      this.croppedImage = null;
      const file = event.target.files[0];
      const reader = new FileReader();
      this.isImageInputUpload = true;

      // Stocker le nom du fichier original sans l'extension
      this.prestation.imageName = file.name.split('.').slice(0, -1).join('.');

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
        const fileName = `prestation_${this.prestation.imageName}_${timestamp}.jpeg`;

        // Créer un nouveau fichier à partir du blob
        const file = new File([blob], fileName, { type: 'image/jpeg' });

        const url = URL.createObjectURL(file);
        this.croppedImage = url;
        this.prestation.image_raw = file;
        this.cropper.destroy();
        this.isImageInputUpload = false;
        console.log(fileName)
      });
    },
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


<style scoped>
@import 'cropperjs/dist/cropper.css';

</style>