<template>
  <div v-if="modalActiveAdd" class="overlay">
    <div class="modal-inner">
      <h3>Ajouter une zone</h3>
      <table>
        <tr>
          <th>Surface </th>
          <td>{{newArea.surface}}</td>
        </tr>
        <tr>
          <th>Zone</th>
          <td>
            <select v-model="zone">
              <option v-for="(zoneList, index) in zones" :key="index" :value="zoneList.id_zone">
                {{ zoneList.libelle }}
              </option>
            </select>

          </td>
        </tr>
      </table>
      <button @click="areaCreated()" class="btn btn-success">Ajouter</button>
      <button @click="$emit('close')" class="btn btn-danger">Fermer</button>
    </div>
  </div>
</template>

<script>

import { createArea } from "@/services/map.service";

export default {
  props: ['modalActiveAdd','newArea', 'zones'],
  data() {
    return {
      zone: null,
    };
  },
  methods: {
    initializeZone() {
      this.zone = this.selectedZone.id_zone;
    },

    async areaCreated() {
      if (this.zone) {
        const areaData = {
          coordonnes: this.newArea.coordinates,
          surface: this.newArea.surface,
          id_zone: this.zone,
        };

        try {
          await createArea(areaData);
          console.log('Area created:', areaData);
          this.$emit('close');
        } catch (error) {
          console.error('Error creating area:', error);
          // Handle errors as needed (e.g., show a notification to the user)
        }
      } else {
        alert('Please select a zone.');
      }
    },
  },
}
</script>

<style scoped>
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

</style>
