<template>
  <div class="add-user-form" >
    <div v-if="isPrestataire === null">
      <h2>Qui êtes vous ?</h2>
      <div class="form d-flex">
        <button type="button" class="bouton btn-success flex-grow-1" @click="setPrestataire">Prestataire</button>
        <button type="button" class="bouton btn-danger flex-grow-1" @click="setClient">Client</button>
      </div>
    </div>

    <form v-if="isPrestataire === false" @submit.prevent="submitFormClient" class="d-flex gap-3 flex-column justify-content-center" style="width: 40vh">

      <div class="form-group">
        <label for="first-name">{{translate("addUser_1")}} </label>
        <input type="text" id="first-name" v-model="utilisateur.firstName" required>
      </div>


      <div class="form-group">
        <label for="last-name">{{translate("addUser_2")}} </label>
        <input type="text" id="last-name" v-model="utilisateur.lastName" required>
      </div>
      <div class="form-group">
        <label for="email">{{translate("addUser_3")}} </label>
        <input type="email" id="email" v-model="utilisateur.email" required>
      </div>

      <div  class="form-group">
        <label for="password">{{translate("addUser_4")}} </label>
        <input type="password" id="password" v-model="utilisateur.password" required>
      </div>


      <div class="form-group">
        <label for="code_postal">{{translate("addUser_5")}} </label>
        <input type="number" id="code_postal" v-model="utilisateur.code_postal" required>
      </div>


      <div class="form-group">
        <label for="adresse">{{translate("addUser_6")}} </label>
        <input type="text" id="adresse" v-model="utilisateur.adresse" required>
      </div>

      <div class="form-group">
        <label for="commune">{{translate("addUser_7")}} </label>
        <input type="text" id="commune" v-model="utilisateur.commune" required>
      </div>


      <div>
        <button type="submit" class="btn btn-success">{{translate("addUser_11")}}</button>
        <button @click="isPrestataire = null" class="btn btn-danger">{{translate("addUser_12")}}</button>
      </div>
    </form>

    <form v-if="isPrestataire === true" @submit.prevent="submitFormPrestataire" class="d-flex gap-3 flex-column justify-content-center" style="width: 40vh">

      <div class="form-group">
        <label for="first-name">prestataire : {{translate("addUser_1")}} </label>
        <input type="text" id="first-name" v-model="utilisateur.firstName" required>
      </div>


      <div class="form-group">
        <label for="last-name">{{translate("addUser_2")}} </label>
        <input type="text" id="last-name" v-model="utilisateur.lastName" required>
      </div>
      <div class="form-group">
        <label for="email">{{translate("addUser_3")}} </label>
        <input type="email" id="email" v-model="utilisateur.email" required>
      </div>

      <div  class="form-group">
        <label for="password">{{translate("addUser_4")}} </label>
        <input type="password" id="password" v-model="utilisateur.password" required>
      </div>

      <div class="form-group">
        <label for="code_postal">{{translate("addUser_5")}} </label>
        <input type="number" id="code_postal" v-model="utilisateur.code_postal" required>
      </div>

      <div class="form-group">
        <label for="adresse">{{translate("addUser_6")}} </label>
        <input type="text" id="adresse" v-model="utilisateur.adresse" required>
      </div>

      <div class="form-group">
        <label for="commune">{{translate("addUser_7")}} </label>
        <input type="text" id="commune" v-model="utilisateur.commune" required>
      </div>

      <div class="form-group">
        <label for="nomStand">nom de votre stand </label>
        <input type="text" id="commune" v-model="stand.nom_stand" required>
      </div>

      <div class="form-group">
        <label for="imageStand">Image du Stand :</label><br>
        <input type="file" id="imageStand" @change="handleImageUpload" accept="image/*" required>
      </div>
      <div v-if="croppedImage">
        <img :src="croppedImage" class="cropped-image" style="width: 100%; border-radius: 15%;" />
      </div>
      <div v-if="isImageInputUpload" class="d-flex flex-column gap-3 justify-content-center">
        <img ref="image" class="cropper-image" style=""/>
        <button type="button" @click="cropImage" class="btn btn-primary">Recadrer l'image</button>
      </div>



      <div>
        <label for="descriptionStand">Description du Stand</label>
        <Editor
            ref="myEditor"
            api-key="q4sg4h4r12ug9lzjx7urncqkiwkg3fevhxjqipuukx146uyt"
            :init="editorConfig"
        />
      </div>

      <button @click="modalActiveAreaSelection=true" class="btn btn-success"> Choisir Emplacement</button>

      <SelectArea :modalActiveAreaSelection="modalActiveAreaSelection" ></SelectArea>

      <div>
        <button type="submit" class="btn btn-success">{{translate("addUser_11")}}</button>
        <button @click="isPrestataire = null" class="btn btn-danger">{{translate("addUser_12")}}</button>
      </div>
    </form>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {translate} from "../../lang/translationService";
import Editor from '@tinymce/tinymce-vue';
import Cropper from 'cropperjs';
import { uploadImageStand } from "@/services/stand.service";
import {uploadImageDescriptionStand} from "@/services/stand.service";

import SelectArea from "@/components/Register/SelectArea.vue";


export default {
  components: {
    Editor,
    SelectArea
  },
  data() {
    return {
      modalActiveAreaSelection: false,
      croppedImage: null,
      isImageInputUpload: false,
      imageRaw: null,
      isPrestataire: null,
      utilisateur: {
        prenom: "",
        nom: "",
        email: "",
        password: "",
        adresse: "",
        code_postal: "",
        commune: "",
        solde: 0,
        id_role: null,
      },
      stand: {
        nom_stand: "",
        image_stand: "",
        description_stand: "",
        id_emplacement: 50, //à choisir avec la map
        id_zone: null,
        id_type_prestation: null,
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
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters(['getAllRoles', 'getCurrentUser'])
  },


  methods: {
    translate,
    ...mapActions(['getRolesStore', 'createUserStore', 'createUsersWithStandStore']),

    setPrestataire() {
      this.isPrestataire = true;
      this.utilisateur.id_role = 2;
    },
    setClient() {
      this.isPrestataire = false;
      this.utilisateur.id_role = 3;
    },
    async loadData() {
      try {
        if (this.getAllRoles.length === 0) {
          await this.getRolesStore();
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    async submitFormClient() {
      try {
        await this.createUserStore({
          user: this.utilisateur,
        });
        this.$router.push('/');
      } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
      }
    },
    async submitFormPrestataire() {
      try {
        if (this.$refs.myEditor && this.$refs.myEditor.editor) {
          const descriptionContent = this.$refs.myEditor.editor.getContent();
          this.stand.description_stand = descriptionContent;
        }

        if (this.imageRaw) {
          await uploadImageStand(this.imageRaw);
        }


        await this.createUsersWithStandStore({
          user: this.utilisateur,
          stand: this.stand,
        });
        this.$router.push('/');
      } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur avec stand :', error);
      }
    },

    async handleImageUploadDescription(blobInfo, success, failure) {
      // Générer un timestamp unique
      const timestamp = Math.floor(Date.now() / 1000);
      // Construire le nouveau nom de fichier
      const fileName = `profile_${timestamp}.jpeg`;
      // Créer une nouvelle instance de File avec le nouveau nom
      const fileInstance = new File([blobInfo.blob()], fileName, {
        type: 'image/jpeg'
      });
      try {
        // Appeler votre fonction d'upload
        const response = await uploadImageDescriptionStand(fileInstance);

        console.log(response.location)
        // Vérifier si la réponse contient l'emplacement du fichier uploadé
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
  }
}
</script>

<style scoped>

.form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.form-group{
  display: flex;
  justify-content: space-between;
}
.bouton {
  min-width: 300px;
  height: 50vh;
  font-size: 2em;
  border: none;
  margin-right: 5%; /* Add space to the right of each button */
}

.btn-success {
  background-color: #5cb85c; /* Change the background color to a nice green */
  color: white; /* Change the text color to white */
}

.btn-danger {
  background-color: #d9534f; /* Change the background color to a nice red */
  color: white; /* Change the text color to white */
}


.add-user-form {
  margin-top: 50px;
  margin-bottom: 100px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}


label {
  margin-bottom: 5px;
}

input, select {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

select {
  width: 100%;
}

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

button[type="submit"]:hover {
  background-color: #1a53ff;
}

.red-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.red-button:hover {
  background-color: #e60000;
}


</style>
