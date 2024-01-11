<template>
  <div>
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
        :initial-value="HomeDescription"
    />
  </main>
  <button v-if="getCurrentUser.session_id !== null && getCurrentUser.id_user !== null && getCurrentUser.id_role === 1 " type="button" @click="saveContent" class="btn btn-success" >Enregistrer les modifications</button>
</div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import {mapActions, mapGetters} from "vuex";
import {uploadImageDescriptionHomePage} from "@/services/homePage.service";
export default {
  components: {
    Editor
  },
  props: ["id", "hd"],
  data() {
    return {
      myEditor: null,
      homeText : null,
      role : null,
      homeDescription : null,
      editMode : false,
      editorConfig: {
        plugins: 'image',
        toolbar: 'image'
      },
    };
  },
  async created() {
    await this.loadData()
    this.myEditor = this.$refs.myEditor;
    this.homeDescription = this.hd
  },
  computed: {
    ...mapGetters('user', ['getCurrentUser']),
    ...mapGetters('roleEtDroit', ['getAllRoles']),
    ...mapGetters('textsHome', ['getTextsHome']),
  },
  methods: {
    ...mapActions('roleEtDroit', ['getRolesStore']),
    ...mapActions('textsHome', ['getTextsHomeStore', 'updateDescriptionHomePageStore']),
    async loadData() {
      try {
        if (this.getTextsHome.length === 0){
          await this.getTextsHomeStore()
        }
        if (this.getAllRoles.length === 0){
          await this.getRolesStore()
        }
        this.homeText = this.getTextsHome.find(txt => txt.id_text_accueil === this.id);
        this.HomeDescription = this.homeText.description;
        this.role = this.getAllRoles.find(role => role.id_role === this.getCurrentUser.id_role).libelle;
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    async handleImageUpload(blobInfo, success, failure) {
      const timestamp = Math.floor(Date.now() / 1000);

      const fileName = `description_home_page${timestamp}.jpeg`;
      const fileInstance = new File([blobInfo.blob()], fileName, {
        type: 'image/jpeg'
      });
      try {
        const response = await uploadImageDescriptionHomePage(fileInstance);

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
      } else {
        console.error('Éditeur non initialisé ou indisponible');
      }
      this.$emit('contentSaved');
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