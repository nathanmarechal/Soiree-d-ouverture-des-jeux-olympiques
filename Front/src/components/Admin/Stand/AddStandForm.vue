<template>
  <div><br><br>
    <h4>Création d'un nouveau stand</h4>
    <form @submit.prevent="submitForm" class="stand">
      <div class="form">
        <label for="nom_stand">{{ translate("createStand_1") }}</label>
        <input type="text" id="nom_stand" v-model="stand.nom_stand" required />
      </div>
      <div class="form">
        <label for="id_user">{{ translate("createStand_2") }}</label>
        <select id="id_user" v-if="this.getAllUsersWithoutStand.length > 0" v-model="id_user" required>
          <option v-for="user in this.getAllUsersWithoutStand" :key="user.id_user" :value="user.id_user">{{ user.prenom }} {{ user.nom }}</option>
        </select>
        <span v-else>{{ translate("createStand_3") }}</span>
      </div>

      <div class="form">
        <label for="image_stand">{{ translate("createStand_4") }}</label><br>
        <input type="file" id="image_stand" @change="handleImageUpload" accept="image/*" required>
      </div>
      <img v-if="!isImageInputUpload && !newImage" :src="getImageSrc(stand.image_stand)" class="card-img-top " style="border-radius: 10%; max-width: 50vh; max-height: 50vh; width: auto; height: auto; object-fit: cover;">
      <div v-if="croppedImage">
        <img :src="croppedImage" class="cropped-image" style="border-radius: 10%; max-width: 50vh; max-height: 50vh; width: auto; height: auto; object-fit: cover;" />
      </div>
      <div class="d-flex flex-column">
          <label for="descriptionStand">{{ translate("createStand_5") }}</label>
          <Editor 
              ref="myEditor"
              api-key="q4sg4h4r12ug9lzjx7urncqkiwkg3fevhxjqipuukx146uyt"
          :init="editorConfig" v-model="stand.description_stand"
          />
      </div>
      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-success" @click="toggleSelectEmplacementModal">{{ translate("createStand_6") }}</button>
      </div>
      <div v-if="stand.id_emplacement">
        <label for="id_emplacement">{{ translate("createStand_7") }}</label>
        <p id="id_emplacement">{{ translate("createStand_8") }} {{ this.stand.id_emplacement }}</p>
      </div>
      <SelectEmplacement @close="toggleSelectEmplacementModal" :showSelectEmplacementModal="showSelectEmplacementModal" @dataEmplacement="handledataEmplacement"></SelectEmplacement>
      <button type="submit" class="btn btn-primary">{{ translate("createStand_9") }}</button>
      <router-link to="/admin/stands" class="btn btn-danger">{{ translate("createStand_10") }}</router-link>
    </form>
  </div>
</template>

<script>
import SelectEmplacement from './SelectEmplacement.vue';
import { mapActions, mapGetters } from 'vuex';
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
    Editor,
    SelectEmplacement,
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
        date_achat: null,
        prix: 0,
        id_emplacement: ''
      },
      id_user: null,
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
      image_stand: null // Initialize to nul
    };
  },
  methods: {
    ...mapActions('roleEtDroit', ['getAllRoleDroitAssociationStore', 'getDroitsStore', 'getRolesStore']),
    ...mapActions('user', ['getUsersStore', 'updateUserStore']),    
    ...mapActions('stands', ['createStandStore', 'getStandStore']),
    async loadData() {
      try {
        await this.getUsersStore();
        await this.getRolesStore();
        await this.getDroitsStore();
        await this.getAllRoleDroitAssociationStore();
        await this.getStandStore();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    getImageSrc(imageName) {
      try {
        return require('./../../../../../Back/assets/stand/profile/' + imageName)
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
        if (this.image_stand) { // Check if the reference is defined
          this.image_stand.src = e.target.result;
          this.initializeCropper();
        }
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
      });
    },
    async submitForm() {
      // Perform form submission logic here to create a new stand
      try {
        this.stand.date_achat = new Date().toISOString().slice(0, 10);
        await this.createStandStore(this.stand); 
        const stand = this.getAllStand.find(stand => stand.id_emplacement === this.stand.id_emplacement);
        //update the user with the right stand id
        const user = this.getAllUsers.find(user => user.id_user === this.id_user);
        user.id_stand = stand.id_stand;
        await this.updateUserStore(user);
        this.$router.push('/admin/stands');
      } catch (error) {
        console.error('Erreur lors de la création du stand :', error);
      }

    },
    toggleSelectEmplacementModal() {
      this.showSelectEmplacementModal = !this.showSelectEmplacementModal;
    },
    handledataEmplacement(data) {
      this.stand.id_emplacement = data;
      this.toggleSelectEmplacementModal();
    },
  },

  computed: {
    ...mapGetters('roleEtDroit', ['getAllRoles', 'getAllDroits', 'getAllRoleDroitAssociation']),
    ...mapGetters('user', ['getAllUsers']),
    ...mapGetters('emplacements', ['getAreaSelectedForStand']),
    ...mapGetters('stands', ['getAllStand']),
    getAllUsersWithoutStand() {
      var data;
      data = this.getAllUsers.filter(user => user.id_stand === null);
      data = data.filter(user => user.id_role === 2);
      //verifie si l'utilisateur peut avoir un stand 
      return data
    }
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
