<template>
  <div>
  <main id="sample">
    <Editor
        ref="myEditor"
        api-key="q4sg4h4r12ug9lzjx7urncqkiwkg3fevhxjqipuukx146uyt"
        :init="{
        toolbar_mode: 'sliding',
        plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
    images_upload_url: 'http://localhost:3000/api/stands/upload', // Node.js server URL
    automatic_uploads: true,
    images_reuse_filename: true
    }"
    initial-value="Welcome to TinyMCE!"
    @on-image-upload="handleImageUpload"
    />
  </main>

  <button @click="saveContent">SAUVEGARDE DU CONTENUE</button>

    <p>Welcome to TinyMCE!</p>
    <p><img src="http://localhost:3000/api/stands/uploads/flamme.jpeg" alt="flamme de fou" width="409" height="177" /></p>


    <p style="text-align: center;">Bonjour je suis un super prestataire !&nbsp;</p>
    <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://localhost:3000/api/stands/uploads/flamme.jpeg" alt="" width="100" height="43" /></p>
    <p>Vous trouverez bcp de choses</p>
    <p>&nbsp;</p>
    <p><img style="float: right;" src="http://localhost:3000/api/stands/uploads/isAdminIcon.png" alt="" width="64" height="64" /></p>
  </div>


</template>

<script>
import axios from 'axios';
import Editor from '@tinymce/tinymce-vue';

export default {
  components: {
    Editor,
  },
  data() {
    return {
      myEditor: null,
    };
  },
  mounted() {
    this.myEditor = this.$refs.myEditor;
  },
  methods: {
    handleImageUpload(blobInfo, success, failure) {
      const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      axios.post('http://localhost:3000/api/stands/upload', formData)
          .then(response => {

            if (response.data.location) {
              success(response.data.location);
            } else {
              failure('Invalid JSON: ' + response.data);
            }
          })
          .catch(error => {
            failure('HTTP Error: ' + error.message);
          });
    },
    async saveContent() {
      console.log(this.myEditor)
      if (this.myEditor && this.myEditor.editor) {
        const content = this.myEditor.editor.getContent();
        console.log('Contenu à enregistrer:', content);
        // Traitez ici les images du contenu, si nécessaire
      } else {
        console.error('Éditeur non initialisé ou indisponible');
      }
    },
  }
}
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
