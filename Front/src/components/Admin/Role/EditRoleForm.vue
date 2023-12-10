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
      console.log(this.role);
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters(["getAllRoles"]),
  },
  methods: {
    ...mapActions(["getRolesStore", "updateRoleStore"]),
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
