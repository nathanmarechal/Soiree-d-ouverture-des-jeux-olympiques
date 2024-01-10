<template>
  <div>
    <div class="form-check form-switch" v-if="getCurrentUser.session_id !== null && getCurrentUser.id_user !== null && getCurrentUser.id_role === 1" style="margin-left: 5px">
      <input class="form-check-input" type="checkbox" id="editModeSwitch" v-model="editMode">
      <label class="form-check-label" for="editModeSwitch">Edit Mode</label>
    </div>
    <div v-if="getCurrentUser.session_id !== null && getCurrentUser.id_user !== null && getCurrentUser.id_role === 1 && editMode === true">
      <page-description-update @contentSaved="handleContentSaved" :id="id" :hd="HomeDescription"></page-description-update>
    </div>
    <div v-else>
      <div v-html="this.HomeDescription" style="padding: 5%"></div>
    </div>
  </div>

</template>
<script>
import {mapActions, mapGetters} from "vuex";
import PageDescriptionUpdate from "@/components/HomePage/pageDescriptionUpdate.vue";

export default {
  components: {
    PageDescriptionUpdate,
  },
  props: ["id"],
  data() {
    return {
      myEditor: null,
      homeText : null,
      HomeDescription: null,
      role : null,
      editMode : false,
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
    //...mapGetters(['getCurrentUser', 'getTextsHome', 'getAllRoles']),
    ...mapGetters('textsHome', ['getTextsHome']),
    ...mapGetters('user', ['getCurrentUser']),
    ...mapGetters('roleEtDroit', ['getAllRoles']),
  },
  methods: {
    //...mapActions(['getTextsHomeStore', 'updateDescriptionHomePageStore', 'getRolesStore']),
    ...mapActions('textsHome', ['getTextsHomeStore', 'updateDescriptionHomePageStore']),
    ...mapActions('roleEtDroit', ['getRolesStore']),
    async loadData() {
      try {
        if (this.getTextsHome.length === 0) {
          await this.getTextsHomeStore()
        }
        if (this.getAllRoles.length === 0) {
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
    handleContentSaved() {
      this.editMode = false;
      this.loadData();
    },
  }
};
</script>

<style scoped>



</style>