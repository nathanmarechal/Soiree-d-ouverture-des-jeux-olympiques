<template>
  <div v-if="modalActiveEdit" class="overlay">
    <div class="modal-inner">
      <h3>Edit Area</h3>

      <!-- Tableau pour afficher les détails de l'emplacement verticalement -->
      <table>
        <tr>
          <th>ID </th>
          <td>{{ selectedArea.id_emplacement }}</td>
        </tr>
        <tr>
          <th>Zone</th>
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
          <th>Surface</th>
          <td>{{ selectedArea.surface }}</td>
        </tr>
        <tr>
          <th>Libre</th>
          <td>{{ selectedArea.isfree ? 'Oui' : 'Non' }}</td>
        </tr>
      </table>

      <button @click="$emit('close'); isEditAreaActive = false" type="button" class="btn btn-success">Fermer</button>
      <button v-if="!isEditAreaActive" @click="isEditAreaActive = true; initializeArea()" type="button" class="btn btn-warning">Modifier emplacement</button>
      <button v-if="isEditAreaActive" @click=" areaUpdate(); isEditAreaActive = false" type="button" class="btn btn-warning">Confirmer modification emplacement</button>
      <button @click="areaDelete()" type="button" class="btn btn-danger">Supprimer</button>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  props: ['modalActiveEdit','selectedArea'],
  data() {
    return {
      zone: null,
      isEditAreaActive:false,
    };
  },
  computed: {
    ...mapGetters(['getAllZone']),
  },
  methods: {
    ...mapActions(['updateAreasStore', 'deleteAreasStore']),
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
          await this.deleteAreasStore(this.selectedArea.id_emplacement);
          //alert('Zone deleted successfully');
          this.$emit('close'); // close the modal
        } catch (error) {
          console.error('Error deleting area:', error);
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
  height: 300px;
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
