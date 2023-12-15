<template>
  <form @submit.prevent="submitForm()" class="d-flex gap-3 flex-column justify-content-center">
    <div class="form-group">
      <label for="libelle">{{translate("editRole_libelle")}}</label>
      <input v-if="$store.getters.getLang==='fr'" v-model="role.libelle" id="libelle" placeholder="Libellé" class="form-control" required>
      <input v-if="$store.getters.getLang==='en'" v-model="role.libelle" id="libelle" placeholder="Label" class="form-control" required>
    </div>
    
    <div class="form-group">
      <label>{{ translate("droitCategory") }}</label>
      <select v-model="selectedCategory" class="form-control">
        <option value="all">{{ translate("allCategories") }}</option>
        <option v-for="category in droitCategories" :key="category">{{ category }}</option>
      </select>
    </div>

    <!-- Add checkboxes for droits based on selected category -->
    <div class="form-group">
      <label>{{ translate("roleDroits") }}</label>
      <div v-for="droit in filteredDroits" :key="droit.id" class="form-check">
        <input
          type="checkbox"
          v-model="roleDroits"
          :value="droit.id"
          class="form-check-input"
        />
        <label class="form-check-label">{{ droit.libelle }}</label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">{{ translate("editRole_modifier") }}</button>
    <router-link to="/admin/roles/" class="btn btn-danger">{{ translate("editRole_quitter") }}</router-link>
  </form>
</template>

<script>
// Import the updateRole method from the service
import { mapActions, mapGetters } from "vuex";
import {translate} from "@/lang/translationService";

export default {
  props: ["selected_role"],
  data() {
    return {
      role: {},
      roleDroits: [],
      selectedCategory: "all",
    };
  },
  async mounted() {
    try {
      this.role = this.selected_role;
      if (this.role.id_role === undefined) {
        throw new Error("Le rôle n'a pas été trouvé");
      }
      console.log(this.role);
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters(["getAllRoles, getAllDroits, getAllRoleDroitAssociation"]),
    droitCategories() {
      // Extract unique categories from droit names
      return [...new Set(this.getAllDroits.map((droit) => this.extractCategoryFromDroitName(droit.libelle)))];
    },
    filteredDroits() {
      // Filter droits based on selected category
      return this.selectedCategory === 'all'
        ? this.getAllDroits
        : this.getAllDroits.filter((droit) => this.extractCategoryFromDroitName(droit.libelle) === this.selectedCategory);
    },
  },
  methods: {
    translate,
    ...mapActions(["getRolesStore", "updateRoleStore", "getDroitsStore", "getAllRoleDroitAssociationStore"]),
    async loadData(){
      try {
        if (this.getAllRoles.length === 0)
            await this.getRolesStore();
        if (this.getAllDroits.length === 0)
            await this.getDroitsStore();
        if (this.getAllRoleDroitAssociation.length === 0)
            await this.getAllRoleDroitAssociationStore();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    extractCategoryFromDroitName(droitName) {
      // Extract category from the second part of droit name after "_"
      const parts = droitName.split('_');
      return parts.length > 1 ? parts[1] : '';
    },
    async submitForm() {
      try {
        console.log("eee",this.role.id_role, this.role.libelle);
        await this.updateRoleStore({
          id_role: this.role.id_role,
          libelle: this.role.libelle,
        });
        this.$router.push({ name: "AdminRoles" });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du rôle :', error);
      }
    },
  },
};
</script>
