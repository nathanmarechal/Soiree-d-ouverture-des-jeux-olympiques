<template>
  <div>
    <main id="sample">
      <Editor
          v-if="role === 'admin'"
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
          :initial-value="HomeDescription"
      />
      <div v-else>
        <div v-html="this.HomeDescription"></div>
      </div>
    </main>
    <button v-if="role === 'admin'" type="button" @click="saveContent" class="btn btn-success" >Enregistrer les modifications</button>
  </div>
</template>
<script>
import image from '../../assets/HomePage/parcours.jpg';
import Editor from '@tinymce/tinymce-vue';
import {mapActions, mapGetters} from "vuex";
import {uploadImageDescriptionHomePage} from "@/services/homePage.service";

export default {
  components: {
    Editor
  },
  props: ["id"],
  data() {
    return {
      myEditor: null,
      image: image,
      homeText : null,
      HomeDescription: null,
      role : null,
      editorConfig: {
        plugins: 'image',
        toolbar: 'image'
      },
    };
  },
  async mounted() {
    await this.loadData()
    this.myEditor = this.$refs.myEditor;
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getTextsHome', 'getAllRoles']),
  },
  methods: {
    ...mapActions(['getTextsHomeStore','updateDescriptionHomePageStore', 'getRolesStore']),
    async loadData() {
      try {
        if (this.getTextsHome.length === 0){
          await this.getTextsHomeStore()
        }
        if (this.getAllRoles.length === 0){
          await this.getRolesStore()
        }
        this.homeText = this.getTextsHome.find(txt => txt.id_text_accueil === this.id);
        console.log(this.homeText + " zazazazazazaza ")
        this.HomeDescription = this.homeText.description;
        console.log(this.HomeDescription + " zouzouzouzozuzouzozuozuozu ")
        this.role = this.getAllRoles.find(role => role.id_role === this.getCurrentUser.id_role).libelle;
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    async handleImageUpload(blobInfo, success, failure) {
      // Générer un timestamp unique
      const timestamp = Math.floor(Date.now() / 1000);
      // Construire le nouveau nom de fichier

      //const fileName = `description_id_homeText_${this.homeText.id}_${timestamp}.jpeg`;
      const fileName = `description_home_page${timestamp}.jpeg`;
      // Créer une nouvelle instance de File avec le nouveau nom
      const fileInstance = new File([blobInfo.blob()], fileName, {
        type: 'image/jpeg'
      });
      try {
        // Appeler votre fonction d'upload
        const response = await uploadImageDescriptionHomePage(fileInstance);

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
        await this.updateDescriptionHomePageStore({
          id_text_accueil: this.id,
          body: { description: content }
        });
        console.log('Contenu à enregistrer:', content);
              // Add here the logic to save the content to your server or handle it as needed
      } else {
        console.error('Éditeur non initialisé ou indisponible');
      }
    },
  }

};
</script>

<style scoped>
@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100%;
  }
}


</style>