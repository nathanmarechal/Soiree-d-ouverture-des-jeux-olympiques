<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th>{{translate("roleList_id")}}</th>
                <th>{{translate("roleList_libelle")}}</th>
                <th>{{ translate("roleList_actions") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(role, index) in getAllRoles" :key="index">
                <td>{{ role.id_role }}</td>
                <td>{{ role.libelle }}</td>
                <td>
                  <router-link :to="{ name: 'AdminEditRoles', params: { selected_role: role } }" class="btn btn-primary">
                    {{ translate("roleList_modifier") }}
                  </router-link>
                  <button class="btn btn-danger" @click="removeRole(role.id_role)">{{ translate("roleList_supprimer") }}</button>
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
import {translate} from "@/lang/translationService";

export default {
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters(['getAllRoles']),
  },
  methods: {
    translate,
    ...mapActions(['getRolesStore', 'deleteRoleStore']),
    async loadData() {
      if (this.getAllRoles.length === 0) {
        await this.getRolesStore();
      }
    },
    async removeRole(id) {
      const role = this.getAllRoles.find(role => role.id_role === id);
      const confirmMessage = this.translate("roleList_ConfirmDeleteMessage")+` ${role.libelle} ?`;
      console.log(role.id_role);
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
