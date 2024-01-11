<template>
  <div v-if="modalActiveEditArea" class="overlay">
    <div class="modal-inner">
      <h3>{{translate("editEmplacement_1")}}</h3>

      <!-- Tableau pour afficher les détails de l'emplacement verticalement -->
      <table>
        <tr>
          <th>{{translate("editEmplacement_2")}} </th>
          <td>{{ selectedArea.id_emplacement }}</td>
        </tr>
        <tr>
          <th>Zone</th>zone
          <td v-if="!isEditAreaActive">{{ selectedArea.zone }}</td>
          <td v-if="isEditAreaActive">
            <select v-model="zone">
              <option v-for="(zoneList, index) in getAllZone" :key="index" :value="zoneList.id_zone">
                {{ zoneList.libelle }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <th>{{translate("editEmplacement_3")}}</th>
          <td>{{ selectedArea.surface }}</td>
        </tr>
        <tr>
          <th>{{translate("editEmplacement_4")}}</th>
          <td>{{ selectedArea.isfree ? translate('oui') : translate('non') }}</td>
        </tr>
      </table>

      <button @click="$emit('close'); isEditAreaActive = false" type="button" class="btn btn-success">{{translate("editEmplacement_5")}}</button>
      <button v-if="!isEditAreaActive && !isProtectorDelete" @click="isEditAreaActive = true; initializeArea()" type="button" class="btn btn-warning">{{translate("editEmplacement_6")}}</button>
      <button v-if="isEditAreaActive && !isProtectorDelete" @click=" areaUpdate(); isEditAreaActive = false" type="button" class="btn btn-warning">{{translate("editEmplacement_7")}}</button>
      <button @click="areaDelete()" type="button" class="btn btn-danger">{{translate("editEmplacement_8")}}</button>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import {translate} from "../../../../lang/translationService";
import router from "@/router";

export default {
  props: {
    modalActiveEditArea: {
      type: Boolean,
      required: true,
    },
    selectedArea: {
      type: Object ,
      required: false,
    },
    isProtectorDelete: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  async mounted() {
    await this.loadData();
  },
  data() {
    return {
      zone: null,
      isEditAreaActive:false,
    };
  },
  computed: {
    ...mapGetters('stands',['getAllStand']),
    ...mapGetters('ZoneEtType', ['getAllZone']),
  },
  methods: {
    translate,

    ...mapActions('emplacements', ['updateAreasStore', 'deleteAreasStore']),
    ...mapActions('stands', ['getStandsStore']),
    async loadData() {
      await this.getStandsStore();
    },
    initializeArea() {
      this.zone = this.selectedArea.id_zone;
    },
    toggleIsEditZoneActive(){
      this.isEditAreaActive = !this.isEditAreaActive;
    },
    async areaUpdate() {
      if (this.selectedArea) {
        try {
          const updatedData = {
            id_zone: this.zone,
          };
          const response = await this.updateAreasStore({id: this.selectedArea.id_emplacement, body: updatedData});
          console.log("response: " + JSON.stringify(response, null, 2));
          //alert('Zone updated successfully');
          this.$emit('close'); // close the modal
        } catch (error) {
          console.error('Error updating area:', error);
          alert('Error updating area');
        }
      } else {
        alert('Please select an area');
      }
    },
    async areaDelete() {
      if (this.selectedArea) {
        try {
          if (this.selectedArea.id_stand != null) {
            //Protector
            window.alert('ALERTEALERTeALERT')
            if (this.$route.name !== 'AdminDeleteCascadeProtector') {
              router.push(
                {
                  name: 'AdminDeleteCascadeProtector',
                  params: {
                    dataType: 'area',
                    dataProp: this.selectedArea,
                  },
                }
              );
              return;
            }else{
              this.$emit('NeedProtection', {dataProp: this.selectedArea, dataType: 'area'});
            }
          }else{
            await this.deleteAreasStore(this.selectedArea.id_emplacement);
          }
          //alert('Zone deleted successfully');
          this.$emit('close'); // close the modal
        } catch (error) {
          alert('Error deleting area');
        }
      } else {
        alert('Please select an area');
      }
    },
  },
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  margin-top: 20px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 1000;
}

.modal-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}

.modal-inner img {
  border-radius: 15px;
  max-width: 25vh;
  margin-bottom: 20px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
