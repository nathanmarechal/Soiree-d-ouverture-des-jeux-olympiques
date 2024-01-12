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
      <label for="isAvailable">est disponible:</label>
      <input v-model="prestation.is_available" id="isAvailable" type="checkbox" class="form-check-input">
    </div>
    <div class="form">
      <label for="image_stand">Image :</label><br>
      <input type="file" id="image_stand" @change="handleImageUpload" accept="image/*" required>
    </div>
    <div>
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

import {getAllTypePrestations, uploadImagePresation} from '@/services/prestation.service'
import { mapActions, mapGetters } from 'vuex';
//import { createPrestation } from "@/services/prestation.service";
import Cropper from 'cropperjs';


export default {
  data() {
    return {
      croppedImage: null,
      isImageInputUpload: false,
      image_raw:false,
      prestation: {
        libelle: "",
        prix: null,
        image: null,
        id_type_prestation: null,
        id_stand: null,
        is_available: false
      },

      //type_prestations: [], // Remplacez par vos données de type de prestation
      //stands: [], // Remplacez par vos données de stand
    };
  },
  computed: {
    ...mapGetters('user', ['getCurrentUser']),
    ...mapGetters('prestationEtType', ['getAllTypePrestation'])
  },
  async mounted() {
    try {
      await this.loadData()

    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  methods: {
    ...mapActions('prestationEtType', ['getTypePrestationsStore','createPrestationStore']),
    async loadData(){
      if (this.getAllTypePrestation.length === 0)
        await this.getTypePrestationsStore()
      this.prestation.id_stand = this.getCurrentUser.id_stand

      console.log(getAllTypePrestations)
    },


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
      this.prestation.image = file.name.split('.').slice(0, -1).join('.');

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
      });
    },
    async submitForm() {
      try {
        await uploadImagePresation(this.image_raw)
        await this.createPrestationStore(this.prestation);

        this.$router.push('/prestataire/prestations/');
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