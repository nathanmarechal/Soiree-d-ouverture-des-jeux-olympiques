<template>
  <div><br><br>
    <h4>Modification d'un stand</h4>
    <form @submit.prevent="submitForm" class="stand">
      <div class="form"> 
        <input type="text" id="id_stand" v-model="stand.id_stand" hidden required />
      </div>
      <div class="form">
        <label for="nom_stand">{{ translate("editStand_1") }}</label>
        <input type="text" id="nom_stand" v-model="stand.nom_stand" required />
      </div>
      <div class="form">
        <label for="id_user">{{ translate("editStand_2") }}</label>
        <select id="id_user" v-model="id_user" required>
          <option v-for="user in this.getAllUsersWithoutStand" :key="user.id_user" :value="user.id_user">{{ user.prenom }} {{ user.nom }}</option>
        </select>
      </div>

      <div v-if="newImage" class="form-group">
        <label for="image_stand">{{ translate("editStand_4") }}</label><br>
        <input type="file" id="image_stand" @change="handleImageUpload" accept="image/*" required>
        <button type="button" @click="changeImage" class="btn btn-danger">{{ translate("editStand_13") }}</button>
      </div>
      <div v-if="!croppedImage && !newImage">
        <img :src="getImageSrc(stand.image_stand)" alt="image_stand" style="max-width: 100%; max-height: 300px; width: auto; height: auto; border-radius: 15%;">
        <button type="button" @click="changeImage" class="btn btn-primary">{{ translate("editStand_14") }}</button>
      </div>
      <div v-if="croppedImage">
        <img :src="croppedImage" class="cropped-image" style="max-width: 100%; max-height: 300px; width: auto; height: auto; border-radius: 15%;" />
      </div>
      <div v-if="isImageInputUpload" class="d-flex flex-column gap-3 justify-content-center">
        <img ref="image_stand" class="cropper-image" style="max-width: 100%; max-height: 300px; width: auto; height: auto; border-radius: 15%;"/>
        <button  type="button" @click="cropImage" class="btn btn-primary">{{ translate("editStand_12") }}</button>
      </div>


      <div class="d-flex flex-column">
          <label for="descriptionStand">{{ translate("editStand_5") }}</label>
          <Editor
            ref="myEditor"
            api-key="q4sg4h4r12ug9lzjx7urncqkiwkg3fevhxjqipuukx146uyt"
            :init="editorConfig"
            v-model="stand.description_stand"
            @init="handleEditorInit"
        />  
      </div>
      
      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-success" @click="toggleSelectEmplacementModal">{{ translate("editStand_6") }}</button>
      </div>
      <div v-if="stand.id_emplacement">
        <p id="id_emplacement">{{ translate("editStand_8") }} {{ this.stand.id_emplacement }}</p>
      </div>
      <SelectEmplacement @close="toggleSelectEmplacementModal" :showSelectEmplacementModal="showSelectEmplacementModal" @dataEmplacement="handledataEmplacement"></SelectEmplacement>
      <button type="submit" class="btn btn-primary">{{ translate("editStand_9") }}</button>
      <router-link to="/admin/stands" class="btn btn-danger">{{ translate("editStand_10") }}</router-link>
    </form>
  </div>
</template>

<script>
import SelectEmplacement from './SelectEmplacement.vue';
import { mapActions, mapGetters } from 'vuex';
import { translate } from "@/lang/translationService";
import Cropper from 'cropperjs';
import Editor from '@tinymce/tinymce-vue';
import { uploadImageStand } from "@/services/stand.service";
import {uploadImageDescriptionStand} from "@/services/stand.service";

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
    selected_stand: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showSelectEmplacementModal: false,
      croppedImage: null,
      isImageInputUpload: false,
      imageRaw: null,
      newImage: false,
      stand: {
        id_stand: null,
        nom_stand: '',
        image_stand: '',
        description_stand: '',
        date_achat: null,
        prix: 0,
        id_emplacement: null,
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
      image_stand: null // Initialize to null
    };
  },
  methods: {
    ...mapActions('roleEtDroit', ['getAllRoleDroitAssociationStore', 'getDroitsStore', 'getRolesStore']),
    ...mapActions('user', ['getUsersStore', 'updateUserStore']),    
    ...mapActions('stands', ['updateStandStore', 'getStandsStore']),
    async loadData() {
      try {
        await this.getUsersStore();
        await this.getRolesStore();
        await this.getDroitsStore();
        await this.getAllRoleDroitAssociationStore();
        await this.getStandsStore();
        this.stand = this.selected_stand;
        this.id_user = this.getAllUsers.find(user => user.id_stand === this.stand.id_stand).id_user;
        console.log("id_user :", this.id_user)
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    translate,
    handleEditorInit(editor) {
      console.log('TinyMCE Editor initialized:', editor);
    },
    destroyed() {
      if (this.cropper) {
        this.cropper.destroy();
      }
    },
    changeImage() {
      this.newImage = !this.newImage;
    },
    async handleImageUploadDescription(blobInfo, success, failure) {
      const timestamp = Math.floor(Date.now() / 1000);
      const fileName = `profile_${timestamp}.jpeg`;
      const fileInstance = new File([blobInfo.blob()], fileName, {
        type: 'image/jpeg'
      });
      try {
        const response = await uploadImageDescriptionStand(fileInstance);

        if (response.location) {
          success(response.location);
        } else {
          failure('Invalid response');
        }
      } catch (error) {
        failure('Upload failed: '+ error.message);
      }
    },

    handleImageUpload(event) {
      this.croppedImage = null;
      const file = event.target.files[0];
      const reader = new FileReader();
      this.isImageInputUpload = true;

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
        zoomable: true,
        scalable: true
      });
    },
    cropImage() {
      const croppedCanvas = this.cropper.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        const timestamp = Math.floor(Date.now() / 1000);
        const fileName = `stand_${timestamp}.jpeg`;
        this.stand.image_stand = fileName;
        const file = new File([blob], fileName, { type: 'image/jpeg' });

        const url = URL.createObjectURL(file);
        this.croppedImage = url;
        this.imageRaw = file;
        this.cropper.destroy();
        this.isImageInputUpload = false;
      });
    },
    async submitForm() {
      // Perform form submission logic here to create a new stand
      try {
        if(this.stand.id_emplacement === null){
          window.alert("Veuillez choisir un emplacement");
          return;
        }else if(this.getAllUsersWithoutStand.length === 0){
          window.alert("Il n'y a plus d'utilisateur disponible");
          return;
        }
        if (this.$refs.myEditor && this.$refs.myEditor.editor) {
          const descriptionContent = this.$refs.myEditor.editor.getContent();
          this.stand.description_stand = descriptionContent;
        }
        if (this.imageRaw) {
          await uploadImageStand(this.imageRaw);
        }
        this.stand.date_achat = new Date().toISOString().slice(0, 10);
        console.log("stand :", this.stand)
        await this.updateStandStore({id : this.stand.id_stand, body : this.stand});
        const stand = this.getAllStand.find(stand => stand.id_emplacement === this.stand.id_emplacement);
        const user = this.getAllUsers.find(user => user.id_user === this.id_user);
        //if the user changed remove the id_stand from the old user
        console.log("checkpoint")
        console.log("user :", user)
        console.log("stand :", stand)
        if(user.id_stand !== stand.id_stand){
          if (this.getAllUsers.find(user => user.id_stand === stand.id_stand) != null || this.getAllUsers.find(user => user.id_stand === stand.id_stand) != undefined){
            const oldUser = this.getAllUsers.find(user => user.id_stand === stand.id_stand);
            oldUser.id_stand = null;
            await this.updateUserStore(oldUser);
            //then add it to the new one
            user.id_stand = stand.id_stand;
            await this.updateUserStore(user);
          }else{
            user.id_stand = stand.id_stand;
            await this.updateUserStore(user);
          }
        }
        this.$router.push('/admin/stands');
      } catch (error) {
        console.error('Erreur lors de la modif du stand :', error);
      }

    },
    getImageSrc(fileName) {
      try {
        return require('./../../../../../Back/assets/stand/profile/' + fileName)
      } catch {
        return "pas d'image"// Image par défaut en cas d'erreur
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
      console.log("papa", data, this.getAllUsers.filter(user => user.id_stand === null))
      //add the user that already had this stand
      console.log("id_stand", this.stand.id_stand)
      if(this.getAllUsers.find(user => user.id_stand === this.stand.id_stand) != null || this.getAllUsers.find(user => user.id_stand === this.stand.id_stand) != undefined){
        data.push(this.getAllUsers.find(user => user.id_stand === this.stand.id_stand));
      } 
      console.log("maman", data, this.getAllUsers.find(user => user.id_stand === this.stand.id_stand))
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
