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
      initial-value="Welcome to TinyMCE!"
      />
    </main>
    <button @click="saveContent">Save Content</button>
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
      editorConfig: {
        plugins: 'image',
        toolbar: 'image'
      },
    };
  },
  mounted() {
    this.myEditor = this.$refs.myEditor;
  },
  methods: {
    handleImageUpload(blobInfo, success, failure) {
      const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      axios.post('http://localhost:3000/api/stands/uploading/picture-description', formData)
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
      if (this.myEditor && this.myEditor.editor) {
        const content = this.myEditor.editor.getContent();
        console.log('Contenu à enregistrer:', content);
        // Add here the logic to save the content to your server or handle it as needed
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