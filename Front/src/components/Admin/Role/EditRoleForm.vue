<template>
  <form @submit.prevent="submitForm()" class="d-flex gap-3 flex-column justify-content-center">
    <div class="form-group">
      <label for="libelle">Libellé:</label>
      <input v-model="role.libelle" id="libelle" placeholder="Libellé" class="form-control" required>
    </div>
    <button type="submit" class="btn btn-success">Modifier</button>
    <router-link to="/admin/roles/" class="btn btn-danger">Quitter</router-link>
  </form>
</template>

<script>
// Import the updateRole method from the service
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["selected_role"],
  data() {
    return {
      role: {},
    };
  },
  async mounted() {
    try {
      this.role = this.selected_role;
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters(["getAllRole"]),
  },
  methods: {
    ...mapActions(["getRolesStore", "updateRoleStore"]),
    async loadData(){
      try {
        if (this.getAllRole.length === 0)
            await this.getRolesStore();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    async submitForm() {
      try {
        await this.updateRoleStore(this.role);
        this.$router.push({ name: "AdminRoles" });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du rôle :', error);
      }
    },
  },
};
</script>
