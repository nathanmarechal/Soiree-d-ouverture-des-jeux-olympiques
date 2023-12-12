<template>
  <form @submit.prevent="submitForm" class="d-flex gap-3 flex-column justify-content-center">
    <div class="form-group">
      <label for="libelle">{{ translate("addRole_libelle") }}</label>
      <input v-model="role.libelle" id="libelle" :placeholder="translate('label_placeholder')" class="form-control" required>
    </div>
    <button type="submit" class="btn btn-primary">{{ translate("addRole_confirm") }}</button>
    <router-link to="/admin/roles" class="btn btn-danger">{{translate("addRole_annuler")}}</router-link>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {translate} from "../../../lang/translationService";
export default {
  data() {
    return {
      role: {
        libelle: ''
      }
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
    ...mapGetters(["getAllRoles"]),
  },
  methods: {
    translate,
    ...mapActions(["getRolesStore", "createRoleStore"]),
    async loadData(){
      try {
        if (this.getAllRoles.length === 0)
            await this.getRolesStore();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    async submitForm() {
      try {
        await this.createRoleStore(this.role);
        this.$router.push({ name: "AdminRoles" });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du rôle :', error);
      }
    },
  },
};
</script>
