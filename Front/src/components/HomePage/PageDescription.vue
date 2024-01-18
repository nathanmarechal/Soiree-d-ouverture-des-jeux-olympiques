<template>
  <div>
    <div class="form-check form-switch" v-if="currentUserHasRight('update_home_page')" style="margin-left: 5px">
      <input class="form-check-input" type="checkbox" id="editModeSwitch" v-model="editMode">
      <label class="form-check-label" for="editModeSwitch">Edit Mode</label>
    </div>
    <div v-if="currentUserHasRight('update_home_page') && editMode === true">
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
import {currentUserHasRight} from "@/droits/droitUtil";

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
    ...mapGetters('textsHome', ['getTextsHome']),
    ...mapGetters('user', ['getCurrentUser']),
    ...mapGetters('roleEtDroit', ['getAllRoles']),
  },
  methods: {
    currentUserHasRight,
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
        this.HomeDescription = this.homeText.description;

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