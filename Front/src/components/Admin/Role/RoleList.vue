<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div v-if="loading">
            <p class="text-danger">Error Loading data...</p>
          </div>
          <div v-else>
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>{{ translate("roleList_id") }}</th>
                  <th>{{ translate("roleList_libelle") }}</th>
                  <th>{{ translate("roleList_droits") }}</th>
                  <th>{{ translate("roleList_actions") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(role, index) in getAllRoles" :key="index">
                  <td>{{ role.id_role }}</td>
                  <td>{{ role.libelle }}</td>
                  <td>
                    <ul style="display: inline-block;">
                      <li v-for="droit in getRoleDroits(role)" :key="droit.id">
                        {{ droit.libelle }}
                      </li>
                      <li v-if="getRoleDroits(role).length === 0">
                        {{ translate("roleList_noDroit") }}
                      </li>
                    </ul>
                  </td>
                  <td>
                    <router-link :to="{ name: 'AdminEditRoles', params: { selected_role: role } }" class="btn btn-primary">
                      {{ translate("roleList_modifier") }}
                    </router-link>
                    <button class="btn btn-danger" @click="removeRole(role.id_role)">
                      {{ translate("roleList_supprimer") }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { translate } from "@/lang/translationService";
import router from "@/router";

export default {
  data() {
    return {
      loading: true,
    };
  },

  async mounted() {
    try {
      await this.loadData();
      this.loading = false; // Set loading to false after data is loaded
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
      this.loading = false; // Handle loading error
    }
  },

  computed: {
    ...mapGetters(['getAllRoles', 'getAllDroits', 'getAllRoleDroitAssociation', 'getRoleDroits', 'getAllUsers']),
  },

  methods: {
    translate,
    ...mapActions(['getRolesStore', 'deleteRoleStore', 'getDroitsStore', 'getAllRoleDroitAssociationStore', 'getUsersStore']),

    async loadData() {
      try {
        await this.getRolesStore();
        await this.getDroitsStore();
        await this.getAllRoleDroitAssociationStore();
        await this.getUsersStore();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    async removeRole(id) {
      const role = this.getAllRoles.find(role => role.id_role === id);
      const confirmMessage = this.translate("roleList_ConfirmDeleteMessage") + ` ${role.libelle} ?`;
      if (window.confirm(confirmMessage)) {
        const ifHasUser = this.getAllUsers.find(user => user.id_role === id);
        if (ifHasUser) {
          window.alert('ALERTEALERTeALERT')
          router.push(
            {
              name: 'AdminDeleteCascadeProtector',
              params: {
                dataType: 'role',
                dataProp: role,
              },
            }
          );
          return;
        }
        else{
          try {
            await this.deleteRoleStore(role.id_role);
          } catch (error) {
            console.error('Erreur lors de la suppression du rôle :', error);
          }
        }
      }
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
