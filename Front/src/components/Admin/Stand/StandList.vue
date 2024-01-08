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
                <tr v-for="(stand, index) in filterProtector ? filteredProtector : getAllStand" :key="index">
                  <td>{{ stand.id_stand }}</td>
                  <td>{{ stand.nom_stand }}</td>
                  <td>{{ stand.image_stand }}</td>
                  <td>{{ stand.description_stand }}</td>
                  <td>{{ formatDate(stand.date_achat) }}</td>
                  <td>{{ stand.prix }}</td>
                  <td>WIP</td>
                  <td>
                    <router-link v-if="!isProtectorDelete" :to="{ name: 'AdminEditStand', params: { selected_stand: stand } }" class="btn btn-primary">
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
  import router from "@/router";
  
  export default {
    props: {
      isProtectorDelete: {
        type: Boolean,
        default: false,
      },
      filterProtector:{
      //contain all data that need to be shown
      type: Array,
      required: false,
      default: () => null,
      },
      previousDataType: {
        type: String,
        required: false,
        default: () => null,
      },
      isLevel2: {
        type: Boolean,
        required: false,
        default: false,
      },
      previousDataId: {
        type: Number,
        required: false,
        default: () => null,
      },
    },
    async mounted() {
      try {
        await this.loadData();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    computed: {
      ...mapGetters(['getAllStand', 'getAllPrestation', 'getAllArea']),
      filteredProtector: function(){
        // verify that the data in filterProtector is still in the getAllStand so for each data in filterProtector, check if it is in getAllStand or else remove it from filterProtector
        if(this.filterProtector != null){
          let filteredProtector = this.filterProtector.filter(protector => this.getAllStand.includes(protector));
          return filteredProtector;
        }

        return null;
      }
    },
    methods: {
      translate,
      ...mapActions(['getStandsStore', 'getAreasStore', 'deleteStandStore', 'deletePrestationStore']),
      async loadData() {
        if (this.getAllStand.length === 0) {
          await this.getStandsStore();
        }
        if (this.getAllArea.length === 0) {
          await this.getAllArea();
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
            //delete all prestations that ahve the same id_stand
            const prestations = this.getAllPrestation.filter(prestation => prestation.id_stand === stand.id_stand);
            console.log(prestations);
            prestations.forEach(prestation => {
              this.deletePrestationStore(prestation.id_prestation);
            });
          } catch (error) {
            console.error('Erreur lors de la suppression du stand :', error);
          }
          console.log(this.isProtectorDelete);
          if (this.isProtectorDelete){
            console.log("dans le if",this.previousDataType );
            if (this.previousDataType === 'user'){
              window.alert("Vous pouvez dorénavant supprimer l'utilisateur");
              console.log("le lvl", this.isLevel2, this.$route.name);
              if (this.isLevel2 === false){
                console.log("isGoingBack to user page");
                router.push({name: 'AdminUsers'});
                return;
              }
            }
            else if (this.previousDataType === 'area'){
              window.alert("Vous pouvez dorénavant supprimer cet emplacement");
              if (this.isLevel2 === false){
                console.log("isGoingBack to map page");
                router.push({name: 'AdminMapPage'});
                return;
              }
            }
            if(this.$route.name != 'AdminDeleteCascadeProtector')
              router.push({
                      name: 'AdminDeleteCascadeProtector',
                        params: {
                          dataType: this.previousDataType,
                          isLevel2: this.isLevel2,
                        },
                      });
            else{
              console.log("all", this.isLevel2, this.previousDataType, this.previousDataId)
              this.$emit('goBack', {isLevel2: this.isLevel2, previousDataType: this.previousDataType, previousDataId: this.previousDataId});
              return;
            }
            console.log("hmmm1");
          }
          console.log("hmmm2");
        }
        console.log("hmmm3");
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
  