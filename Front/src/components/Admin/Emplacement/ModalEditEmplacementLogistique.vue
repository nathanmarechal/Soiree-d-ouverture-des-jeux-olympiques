<template>
  <div v-if="modalActiveEditEmplacementLogistique" class="overlay">
    <div class="modal-inner">
      {{ selectedEmplacementLogistique }}
      <h3>{{ translate("editEmplacement_1") }}</h3>
      <!-- Tableau pour afficher les détails de l'emplacement -->
      <table>
        <!-- Ajouter des lignes ici pour afficher les propriétés de selectedEmplacementLogistique -->
      </table>

      <button @click="$emit('close')" type="button" class="btn btn-success">{{ translate("editEmplacement_5") }}</button>
      <!-- Mettre à jour les autres boutons et leurs méthodes selon les besoins -->
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import {translate} from "../../../lang/translationService";

export default {
  props: ['modalActiveEditEmplacementLogistique', 'selectedEmplacementLogistique'],
  mounted() {
    alert('chargé');
  },
  computed: {
    ...mapGetters(['getAllZone']),
  },
  methods: {
    translate,
  }
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
