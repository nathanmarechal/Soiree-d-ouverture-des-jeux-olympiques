<template>
  <div>
    <div v-if="isDataLoaded" class="container">
      <div class="row">
        <div class="col-12">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th>{{ translate("roleList_id") }}</th>
                <th>{{ translate("roleList_libelle") }}</th>
                <th>{{ translate("roleList_actions") }}</th>
                <th>Droits</th>
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
                  <button class="btn btn-danger" @click="removeRole(role.id_role)">
                    {{ translate("roleList_supprimer") }}
                  </button>
                </td>
                <td>
                  <ul style="display: inline-block;">
                    <li v-for="(droit, index) in role.droits" :key="index">
                      {{ getDroitLibelleById(droit) }}
                    </li>
                    <li v-if="role.droits.length === 0">
                      {{ translate("roleList_noDroit") }}
                    </li>
                  </ul>
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
import { translate } from "@/lang/translationService";

export default {
  data() {
    return {
      isDataLoaded: false,
    };
  },

  async mounted() {
    try {
      await this.loadData();
      this.isDataLoaded = true; // Set data loaded state to true
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },

  computed: {
    ...mapGetters(['getAllRoles', 'getAllDroits', 'getAllRoleDroitAssociation']),
  },

  methods: {
    translate,
    ...mapActions(['getRolesStore', 'deleteRoleStore', 'getDroitsStore', 'getAllRoleDroitAssociationStore']),

    async loadData() {
      try {
        await this.getRolesStore();
        await this.getDroitsStore();
        await this.getAllRoleDroitAssociationStore();

        // Associate droits with roles
        this.getAllRoles.forEach((role) => {
          const roleAssociations = this.getAllRoleDroitAssociation.filter(
            (association) => association.id_role === role.id_role
          );
        
          role.droits = roleAssociations.map((association) => association.id_droit);
        });
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },

    getDroitLibelleById(droitId) {
      //console.log ('getAllDroits :', this.getAllDroits);
      //console.log('droitId :', droitId);
      const droit = this.getAllDroits.find(d => {
        //console.log('Current Object:', d);
        //console.log('Comparison Result:', d.id === Number(droitId));
        return d.id === Number(droitId);
      });
      //console.log('droit :', droit);
      return droit ? droit.libelle : 'Unknown Droit';
    },

    async removeRole(id) {
      const role = this.getAllRoles.find(role => role.id_role === id);
      const confirmMessage = this.translate("roleList_ConfirmDeleteMessage") + ` ${role.libelle} ?`;

      if (window.confirm(confirmMessage)) {
        try {
          await this.deleteRoleStore(role.id_role);
        } catch (error) {
          console.error('Erreur lors de la suppression du rôle :', error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
