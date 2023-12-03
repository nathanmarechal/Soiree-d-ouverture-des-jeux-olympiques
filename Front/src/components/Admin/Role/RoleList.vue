<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th>id</th>
                <th>libelle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(role, index) in getAllRole" :key="index">
                <td>{{ role.id_role }}</td>
                <td>{{ role.libelle }}</td>
                <td>
                  <router-link :to="{ name: 'AdminEditRoles', params: { selected_role: role } }" class="btn btn-primary">Modifier</router-link>
                  <button class="btn btn-danger" @click="removeRole(role.id_role)">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters(['getAllRole']),
  },
  methods: {
    ...mapActions(['getRolesStore', 'deleteRoleStore']),
    async loadData() {
      if (this.getAllRole.length === 0) {
        await this.getRolesStore();
      }
    },
    async removeRole(id) {
      const role = this.getAllRole.find(role => role.id_role === id);
      const confirmMessage = `Êtes-vous sûr de vouloir supprimer le rôle ${role.libelle} ?`;
      if (window.confirm(confirmMessage)) {
        try {
          await this.deleteRoleStore(role.id_role);
          // Consider using Vuex mutations to update the state
        } catch (error) {
          console.error('Erreur lors de la suppression du rôle :', error);
        }
      }
    }
  }
};
</script>

<style scoped>
/* Your styles here */
</style>
