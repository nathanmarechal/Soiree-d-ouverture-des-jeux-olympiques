<template>
  <form @submit.prevent="submitForm" class="d-flex gap-3 flex-column justify-content-center">
    <div class="form-group">
      <label for="libelle">Libellé:</label>
      <input v-model="role.libelle" id="libelle" placeholder="Libellé" class="form-control" required>
    </div>
    <button type="submit" class="btn btn-success">Add Role</button>
    <router-link to="/admin/roles" class="btn btn-danger">Cancel</router-link>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
