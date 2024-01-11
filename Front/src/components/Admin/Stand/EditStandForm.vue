<template>
  <div>
    <h4>Modification du stand</h4>
    <form @submit.prevent="submitForm" class="stand">
      <div class="form">
        <label for="nom_stand">{{ translate("editStand_1") }}</label>
        <input type="text" id="nom_stand" v-model="stand.nom_stand" required />
      </div>
      <div class="form">
        <label for="image_stand">Image :</label><br>
        <input type="file" id="image_stand" @change="handleImageUpload" accept="image/*">
      </div>
      <img v-if="!isImageInputUpload && !newImage" :src="getImageSrc(stand.image_stand)" alt="Image du stand" class="card-img-top " style="border-radius: 10%; max-width: 50vh; max-height: 50vh; width: auto; height: auto; object-fit: cover;">
      <div v-if="croppedImage">
        <img :src="croppedImage" class="cropped-image" style="border-radius: 10%; max-width: 50vh; max-height: 50vh; width: auto; height: auto; object-fit: cover;" />
      </div>
      <div v-if="isImageInputUpload" class="d-flex flex-column gap-3 justify-content-center">
        <img ref="image_stand" class="cropper-image" style=" max-width: 50vh; max-height: 50vh; width: auto; height: auto; object-fit: cover;"/>
        <button  type="button" @click="cropImage" class="btn btn-primary">Recadrer l'image</button>
      </div>
      
      <div class="d-flex flex-column">
          <label for="descriptionStand">{{ translate("editStand_3") }}</label>
          <Editor 
              ref="myEditor"
              api-key="q4sg4h4r12ug9lzjx7urncqkiwkg3fevhxjqipuukx146uyt"
          :init="editorConfig" v-model="stand.description_stand"
          />
      </div>



      <map-sign-up-pre-view style="width: 100%; height: 25vh;"></map-sign-up-pre-view>

      <div class="d-flex justify-content-center"> <!-- Flexbox for centering -->
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
import { mapGetters } from 'vuex';
import { translate } from "../../../lang/translationService";
import Cropper from 'cropperjs';
import Editor from '@tinymce/tinymce-vue';


export default {
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  components: {
    SelectEmplacement,
    Editor
  },
  props: {
    selected_stand: {
      type: Object,
      required: true
    }
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
      },
      editorConfig: {
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image',
          images_upload_handler: this.handleImageUploadDescription
        },

    };
  },
  methods: {
    loadData() {
      this.stand = { ...this.selected_stand };
    },
    getImageSrc(imageName) {
      try {
        return require('./../../../../../Back/assets/stand/profile/' + imageName)
      } catch {
        console.error('Erreur lors du chargement de l’image');
        return require('@/assets/clown.png'); // Image par défaut en cas d'erreur
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

      // Stocker le nom du fichier original sans l'extension
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
        const timestamp = Math.floor(Date.now() / 1000); // Temps en Unix
        const fileName = `stand_${timestamp}.jpeg`;
        this.stand.image_stand=fileName;

        // Créer un nouveau fichier à partir du blob
        const file = new File([blob], fileName, { type: 'image/jpeg' });

        const url = URL.createObjectURL(file);
        this.croppedImage = url;
        this.image_raw = file;
        this.cropper.destroy();
        this.isImageInputUpload = false;
      });
    },
    submitForm() {
      console.log(this.stand);
    },
    toggleSelectEmplacementModal() {
      this.showSelectEmplacementModal = !this.showSelectEmplacementModal;
    }
  },

  computed: {
    ...mapGetters('emplacements', ['getAreaSelectedForStand'])
  },
  watch: {
    getAreaSelectedForStand: 'toggleSelectEmplacementModal',
    selected_stand: {
      handler(newVal) {
        // Update the form values when the prop changes
        this.stand = { ...newVal };
      },
      deep: true,
      immediate: true,
    },
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
