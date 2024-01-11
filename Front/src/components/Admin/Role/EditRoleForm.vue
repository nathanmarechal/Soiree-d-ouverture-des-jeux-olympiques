<template>
  <div><br><br><br>
      <form @submit.prevent="submitForm" class="d-flex gap-3 flex-column justify-content-center">
      <div class="form-group">
        <label for="libelle">{{ translate("editRole_libelle") }}</label>
        <input v-model="role.libelle" id="libelle" :placeholder="translate('label_placeholder')" class="form-control" required>
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
        <label>{{ translate("droit") }}</label>
        <div class="form-check" v-for="droit in filteredDroits" :key="droit.id">
          <input
            v-model="selectedDroits"
            :value="droit.id"
            :id="droit.id"
            type="checkbox"
            class="form-check-input"
          />
          <label :for="droit.id" class="form-check-label">{{ droit.libelle }}</label>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">{{ translate("editRole_confirm") }}</button>
      <router-link to="/admin/roles" class="btn btn-danger">{{ translate("editRole_annuler") }}</router-link>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { translate } from "@/lang/translationService";

export default {
  props: {
    selected_role: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      role: {},
      selectedCategory: "all",
      selectedDroits: [],
      session_id:"",
    };
  },
  async mounted() {
    try {
      this.role = this.selected_role;
      await this.loadData();
    } catch (err) {
      console.error("Erreur lors du chargement des données :", err);
    }
  },
  computed: {
    ...mapGetters('roleEtDroit', ["getAllDroits", "getAllRoleDroitAssociation", "getRoleDroits"]),
    ...mapGetters('user', ["getCurrentUser"]),
    droitCategories() {
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
    ...mapActions('roleEtDroit', ["getDroitsStore", "updateRoleStore", "getAllRoleDroitAssociationStore", "createRoleDroitAssociationStore", "deleteRoleDroitAssociationForSpecificRoleStore"]),
    translate,
    async loadData() {
      try {
        await this.getDroitsStore();
        await this.getAllRoleDroitAssociationStore();
        this.selectedDroits = this.getAllSelectedDroits();
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
      }
    },
    getAllSelectedDroits(){
      console.log("digondsngos", this.getRoleDroits(this.role.id_role))
      let selectedDroitsID = [];
      let allAssociation = this.getAllRoleDroitAssociation;
      console.log("all association", allAssociation);
      for (let i = 0; i < allAssociation.length; i++) {
        console.log("i", i);
        console.log("all association id role", allAssociation[i].id_role);
        console.log("this role id", this.role.id_role);
        if (allAssociation[i].id_role === this.role.id_role) {
          selectedDroitsID.push(allAssociation[i].id_droit);
          console.log("selected droits id", selectedDroitsID);
        }
      }
      console.log("all selected droits id", selectedDroitsID);
      return selectedDroitsID;
    },
    getFilteredDroits() {
      return this.selectedCategory === "all"
        ? this.getAllDroits
        : this.getAllDroits.filter(
            (droit) => this.extractCategoryFromDroitName(droit.libelle) === this.selectedCategory
          );
    },
    extractCategoryFromDroitName(droitName) {
      // Extract category from the second part of droit name after "_"
      const parts = droitName.split('_');
      return parts.length > 1 ? parts[1] : '';
    },
    async submitForm() {
      try {
        // modify the role
        this.role.session_id = this.getCurrentUser.session_id;
        let result = await this.updateRoleStore(this.role);
        console.log('Résultat de la modification du rôle :', result);
        // delete all the selected droits for the role
        await this.deleteRoleDroitAssociationForSpecificRoleStore(this.role.id_role);
        // Save the selected droits for the role
        for (const droitId of this.selectedDroits) {
          await this.createRoleDroitAssociationStore({
            id_role: result[0].id_role,
            id_droit: droitId,
          });
        }
        this.$router.push({ name: "AdminRoles" });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du rôle :', error);
      }
    },
  }
};
</script>
