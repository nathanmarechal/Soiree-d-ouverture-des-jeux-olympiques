<template>
  <div v-if="modalActiveEdit" class="overlay">
    <div class="modal-inner">
      <h3>Edit Area</h3>

      <!-- Tableau pour afficher les détails de la zone verticalement -->
      <table>
        <tr>
          <th>ID </th>
          <td>{{ zone.id_emplacement }}</td>
        </tr>
        <tr>
          <th>Zone</th>
          <td v-if="!isEditZoneActive">{{ zone.zone }}</td>
          <td v-if="isEditZoneActive">
            <select>
                <option v-for="(zoneList, index) in getAllZone" :key="index" >{{ zoneList.libelle }}</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>Surface</th>
          <td>{{ zone.surface_area }}</td>
        </tr>
        <tr>
          <th>Libre</th>
          <td>{{ zone.isfree ? 'Oui' : 'Non' }}</td>
        </tr>

      </table>

      <button @click="$emit('close'); isEditZoneActive = false" type="button" class="btn btn-success">Fermer</button>
      <button v-if="!isEditZoneActive" @click="isEditZoneActive = true" type="button" class="btn btn-warning">Modifier zone</button>
      <button v-if="isEditZoneActive" @click="isEditZoneActive = false" type="button" class="btn btn-warning">Confirmer modification zone</button>
      <button @click="$emit('close')" type="button" class="btn btn-danger">Supprimer</button>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex';
export default {
  props: ['modalActiveEdit','zone'],
  computed: {
    ...mapGetters([
      'getAllZone',
    ]),
  },
  data() {
    return {
      isEditZoneActive:false,
    };
  },
  methods: {
    toggleIsEditZoneActive(){
      this.isEditZoneActive = !this.isEditZoneActive;
    }
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
