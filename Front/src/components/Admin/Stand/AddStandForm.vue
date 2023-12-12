<template>
  <div>
    <h4>Création d'un nouveau stand</h4>
    <form @submit.prevent="submitForm" class="stand">
      <div class="form">
        <label for="nom_stand">{{ translate("editStand_1") }}</label>
        <input type="text" id="nom_stand" v-model="stand.nom_stand" required />
      </div>
      <div class="form">
        <label for="image_stand">Image :</label><br>
        <input type="file" id="image_stand" @change="handleImageUpload" accept="image/*" required>
      </div>
      <img v-if="!isImageInputUpload && !newImage" :src="getImageSrc(stand.image_stand)" class="card-img-top " style="border-radius: 10%; max-width: 50vh; max-height: 50vh; width: auto; height: auto; object-fit: cover;">
      <div v-if="croppedImage">
        <img :src="croppedImage" class="cropped-image" style="border-radius: 10%; max-width: 50vh; max-height: 50vh; width: auto; height: auto; object-fit: cover;" />
      </div>
      <map-sign-up-pre-view style="width: 100%; height: 25vh;"></map-sign-up-pre-view>

      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-success" @click="toggleSelectEmplacementModal">{{ translate("editStand_4") }}</button>
      </div>
      <SelectEmplacement @close="toggleSelectEmplacementModal" :showSelectEmplacementModal="showSelectEmplacementModal"></SelectEmplacement>
      <button type="submit" class="btn btn-primary">{{ translate("editStand_5") }}</button>
      <router-link to="/admin/stands" class="btn btn-danger">{{ translate("editStand_6") }}</router-link>
    </form>
  </div>
</template>

<script>
import SelectEmplacement from './SelectEmplacement.vue';
import MapSignUpPreView from '../../Map/MapSignUpPreView.vue'
import { mapGetters } from 'vuex';
import { translate } from "../../../lang/translationService";
import Cropper from 'cropperjs';

export default {
  async mounted() {
    try {
      // No need to load data for creating a new stand
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  components: {
    SelectEmplacement,
    MapSignUpPreView
  },
  props: {
    // No need for the selected_stand prop when creating a new stand
  },
  data() {
    return {
      showSelectEmplacementModal: false,
      croppedImage: null,
      isImageInputUpload: false,
      newImage: false,
      image_raw:false,
      stand: {
        nom_stand: '',
        image_stand: '',
        description_stand: '',
        date_achat: 'WIP',
        prix: 'WIP',
        id_emplacement: 'WIP'
      }
    };
  },
  methods: {
    getImageSrc(imageName) {
      try {
        console.log(imageName)
        return require('../../../assets/stand/' + imageName)
      } catch {
        console.log("pas d'image")
      }
    },
    translate,
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

      // Store the original file name without the extension
      this.stand.image_stand = file.name.split('.').slice(0, -1).join('.');

      reader.onload = (e) => {
        this.$refs.image_stand.src = e.target.result;
        this.initializeCropper();
      };
      reader.readAsDataURL(file);
    },
    initializeCropper() {
      const image = this.$refs.image_stand;
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 3,
        zoomable:true,
        scalable:true
      });
    },
    cropImage() {
      this.newImage = true;
      const croppedCanvas = this.cropper.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        const timestamp = Math.floor(Date.now() / 1000); // Unix time
        const fileName = `stand_${timestamp}.jpeg`;
        this.stand.image_stand=fileName;

        // Create a new file from the blob
        const file = new File([blob], fileName, { type: 'image/jpeg' });

        const url = URL.createObjectURL(file);
        this.croppedImage = url;
        this.image_raw = file;
        this.cropper.destroy();
        this.isImageInputUpload = false;
        console.log(fileName)
      });
    },
    submitForm() {
      // Perform form submission logic here to create a new stand
      console.log('Creating a new stand:', this.stand);
    },
    toggleSelectEmplacementModal() {
      this.showSelectEmplacementModal = !this.showSelectEmplacementModal;
    }
  },
  computed: {
    ...mapGetters([
      'getAreaSelectedForStand',
    ]),
  },
  watch: {
    getAreaSelectedForStand: 'toggleSelectEmplacementModal',
  }
};
</script>

<style scoped>
@import 'cropperjs/dist/cropper.css';

button[type="submit"] {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4d79ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

input, select {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.stand {
  display: flex;
  flex-direction: column;
  gap: 1vh;
}

.form {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
}
</style>
