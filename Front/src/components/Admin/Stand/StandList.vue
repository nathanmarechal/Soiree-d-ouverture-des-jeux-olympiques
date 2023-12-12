<template>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>{{ translate("standList_id") }}</th>
                  <th>{{ translate("standList_nom") }}</th>
                  <th>{{ translate("standList_image") }}</th>
                  <th>{{ translate("standList_description") }}</th>
                  <th>{{ translate("standList_dateAchat") }}</th>
                  <th>{{ translate("standList_prix") }}</th>
                  <th>{{ translate("standList_emplacement") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(stand, index) in getAllStand" :key="index">
                  <td>{{ stand.id_stand }}</td>
                  <td>{{ stand.nom_stand }}</td>
                  <td>{{ stand.image_stand }}</td>
                  <td>{{ stand.description_stand }}</td>
                  <td>{{ formatDate(stand.date_achat) }}</td>
                  <td>{{ stand.prix }}</td>
                  <td>WIP</td>
                  <td>
                    <router-link :to="{ name: 'AdminEditStand', params: { selected_stand: stand } }" class="btn btn-primary">
                      {{ translate("Edit") }}</router-link>
                    <button class="btn btn-danger" @click="removeStand(stand.id_stand)">{{ translate("Delete") }}</button>
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
  import {translate} from "../../../lang/translationService";
  
  export default {
    async mounted() {
      try {
        await this.loadData();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    computed: {
      ...mapGetters(['getAllStand']),
    },
    methods: {
      translate,
      ...mapActions(['getStandsStore', 'deleteStandStore']),
      async loadData() {
        if (this.getAllStand.length === 0) {
          await this.getStandsStore();
        }
        console.log(this.getAllStand);
      },
      async removeStand(id) {
        const stand = this.getAllStand.find(stand => stand.id_stand === id);
        const confirmMessage = `Êtes-vous sûr de vouloir supprimer le stand ${stand.nom_stand} ?`;
        console.log(stand.id_stand);
        if (window.confirm(confirmMessage)) {
          try {
            await this.deleteStandStore(stand.id_stand);
            // Consider using Vuex mutations to update the state
          } catch (error) {
            console.error('Erreur lors de la suppression du stand :', error);
          }
        }
      },
      formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(dateString).toLocaleDateString('fr-FR', options);
        return formattedDate;
        }
    }
  };
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  