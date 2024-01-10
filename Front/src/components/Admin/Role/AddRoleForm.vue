<template>
  <div><br><br><br>
    <form @submit.prevent="submitForm" class="d-flex gap-3 flex-column justify-content-center">
      <div class="form-group">
        <label for="libelle">{{ translate("addRole_libelle") }}</label>
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
    
      <button type="submit" class="btn btn-primary">{{ translate("addRole_confirm") }}</button>
      <router-link to="/admin/roles" class="btn btn-danger">{{ translate("addRole_annuler") }}</router-link>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { translate } from "@/lang/translationService";

export default {
  data() {
    return {
      role: {
        libelle: '',
        id_role: null, // Add id_role property
        session_id:''
      },
      roleDroits: [],
      selectedCategory: 'all',
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
    //...mapGetters(["getAllRoles", "getAllDroits","getCurrentUser"]),
    ...mapGetters('roleEtDroit', ["getAllRoles", "getAllDroits"]),
    ...mapGetters('user', ["getCurrentUser"]),
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
    //...mapActions(["getRolesStore", "createRoleStore", "getDroitsStore", "createRoleDroitAssociationStore"]),
    ...mapActions('roleEtDroit', ["getRolesStore", "createRoleStore", "getDroitsStore", "createRoleDroitAssociationStore"]),
    async loadData() {
      try {
        if (this.getAllRoles.length === 0) await this.getRolesStore();
        if (this.getAllDroits.length === 0) await this.getDroitsStore();
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
        // Create the role
        this.role.session_id = this.getCurrentUser.session_id
       // console.log("arf session_id : "+this.getCurrentUser.session_id)
       // console.log("arf body : "+this.role.session_id)
        let result = await this.createRoleStore(this.role);
        console.log('Résultat de la création du rôle :', result);

        // Save the selected droits for the role
        for (const droitId of this.roleDroits) {
          await this.createRoleDroitAssociationStore({
            id_role: result.id_role,
            id_droit: droitId,
          });
        }
        this.$router.push({ name: "AdminRoles" });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du rôle :', error);
      }
    },
  },
};
</script>
