<template>
  <div v-if="modalActiveEdit" class="overlay">
    <div class="modal-inner">
      <h3>Edit Area</h3>

      <!-- Tableau pour afficher les détails de la zone verticalement -->
      <table>
        <tr>
          <th>ID </th>
          <td>{{ selectedZone.id_emplacement }}</td>
        </tr>
        <tr>
          <th>Zone</th>
          <td v-if="!isEditZoneActive">{{ selectedZone.zone }}</td>
          <td v-if="isEditZoneActive">
            <select v-model="zone">
              <option v-for="(zoneList, index) in zones" :key="index" :value="zoneList.id_zone">
                {{ zoneList.libelle }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <th>Surface</th>
          <td>{{ selectedZone.surface_area }}</td>
        </tr>
        <tr>
          <th>Libre</th>
          <td>{{ selectedZone.isfree ? 'Oui' : 'Non' }}</td>
        </tr>
      </table>

      <button @click="$emit('close'); isEditZoneActive = false" type="button" class="btn btn-success">Fermer</button>
      <button v-if="!isEditZoneActive" @click="isEditZoneActive = true; initializeZone()" type="button" class="btn btn-warning">Modifier zone</button>
      <button v-if="isEditZoneActive" @click=" areaUpdate(); isEditZoneActive = false" type="button" class="btn btn-warning">Confirmer modification zone</button>
      <button @click="areaDelete()" type="button" class="btn btn-danger">Supprimer</button>
    </div>
  </div>
</template>

<script>

import { updateArea, deleteArea } from "@/services/map.service";


export default {
  props: ['modalActiveEdit','selectedZone', 'zones'],
  data() {
    return {
      zone: null,
      isEditZoneActive:false,
    };
  },
  methods: {
    initializeZone() {
      this.zone = this.selectedZone.id_zone;
    },
    toggleIsEditZoneActive(){
      this.isEditZoneActive = !this.isEditZoneActive;
    },
    async areaUpdate() {
      console.log("selectedZone: " + JSON.stringify(this.selectedZone, null, 2));
      console.log("zone: " + JSON.stringify(this.zone, null, 2));
      if (this.selectedZone) {
        try {
          const updatedData = {
            id_zone: this.zone,
          };
          const response = await updateArea(this.selectedZone.id_emplacement, updatedData);
          console.log("response: " + JSON.stringify(response, null, 2));
          //alert('Zone updated successfully');
          this.$emit('close'); // close the modal
        } catch (error) {
          console.error('Error updating zone:', error);
          alert('Error updating zone');
        }
      } else {
        alert('Please select a zone');
      }
    },
    async areaDelete() {
      if (this.selectedZone) {
        try {
          await deleteArea(this.selectedZone.id_emplacement);
          //alert('Zone deleted successfully');
          this.$emit('close'); // close the modal
        } catch (error) {
          console.error('Error deleting zone:', error);
          alert('Error deleting zone');
        }
      } else {
        alert('Please select a zone');
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
