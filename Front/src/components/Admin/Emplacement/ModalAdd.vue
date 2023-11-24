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
            <select>
              <option v-for="(zoneList, index) in getAllZone" :key="index" >{{ zoneList.libelle }}</option>
            </select>
          </td>
        </tr>
      </table>
      <button @click="$emit('close')" class="btn btn-success">Ajouter</button>
      <button @click="$emit('close')" class="btn btn-danger">Fermer</button>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
  props: ['modalActiveAdd','newArea'],
  computed: {
    ...mapGetters([
      'getAllZone',
    ]),
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
