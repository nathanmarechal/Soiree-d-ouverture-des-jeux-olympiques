
<template>
  <div>
    <div>
      <div class="rating">
        <i class="fa fa-star" v-for="n in 5" :key="n"
           :class="{ 'selected': n <= rating }"
           @click="setRating(n)"></i>
      </div>
      <main id="sample">
        <Editor
            ref="myEditor"
            api-key="q4sg4h4r12ug9lzjx7urncqkiwkg3fevhxjqipuukx146uyt"
            :init="{
        height: 500,
        menubar: true,
        plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help | image',
        images_upload_handler: handleImageUpload
        }"
            :initial-value="tempAvis"
        />
      </main>
      <button type="button" @click="saveContent" class="btn btn-success" >ajouter l'avis</button>
    </div>
  </div>
</template>


<script>

import {mapActions, mapGetters} from "vuex";
import '@fortawesome/fontawesome-free/css/all.css';
import Editor from "@tinymce/tinymce-vue";
import {uploadImageAvis} from "@/services/avis.service";

export default {
  components: {
    Editor
  },

  data() {
    return {
      rating : 0,
      myEditor: null,
      size : 0,
      index : 0,
      tempAvis : "entrez ici votre avis",
      editorConfig: {
        plugins: 'image',
        toolbar: 'image'
      },
    }
  },
  async mounted() {
    this.myEditor = this.$refs.myEditor;
  },
  computed: {
    //...mapGetters(['getSelectedStands', 'getAvis', "getCurrentUser"]),
    ...mapGetters('avis', ['getAvis']),
    ...mapGetters('stands', ['getSelectedStands']),
    ...mapGetters('user', ['getCurrentUser'])
  },
  methods: {
    //...mapActions(['getAvisStore', "uploadAvisStore"]),
    ...mapActions('avis', ['getAvisStore', "uploadAvisStore"]),


    async handleImageUpload(blobInfo, success, failure) {
      // Générer un timestamp unique
      const timestamp = Math.floor(Date.now() / 1000);

      const fileName = `description_home_page${timestamp}.jpeg`;
      // Créer une nouvelle instance de File avec le nouveau nom
      const fileInstance = new File([blobInfo.blob()], fileName, {
        type: 'image/jpeg'
      });
      try {
        // Appeler votre fonction d'upload
        const response = await uploadImageAvis(fileInstance);

        console.log(response.location)
        // Vérifier si la réponse contient l'emplacement du fichier uploadé
        if (response.location) {
          success(response.location);
        } else {
          failure('Invalid response');
        }
      } catch (error) {
        failure('Upload failed: '   + error.message);
      }
    },
    async saveContent() {
      if (this.myEditor && this.myEditor.editor) {
        const content = await this.myEditor.editor.getContent();
        await this.uploadAvisStore({"id_stand" : this.getSelectedStands[0], "id_user" : this.getCurrentUser.id_user, "note" : this.rating, "commentaire" : content});
        console.log('Contenu à enregistrer:', content);
        this.$emit('contentSaved');
      } else {
        console.error('Éditeur non initialisé ou indisponible');
      }
    },
    async setRating(rating) {
      this.rating = rating;
    },
  },
}

</script>

<style scoped>

.rating {
  text-align: center;
}

.rating i {
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
}

.rating i.selected {
  color: #ffd700;
}

</style>