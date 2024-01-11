<template>
  <div>
    <div v-if="showSelectEmplacementModal" class="overlay">
      <button class="close-btn" @click="$emit('close')">×</button>
      <div class="modal-inner">
        <FilterMapSelectionArea style="width: 20%; height : 100%;"></FilterMapSelectionArea>
        <MapSignUp @dataEmplacement="handleDataEmplacement" style="width: 70%; height : 100%;"></MapSignUp>
      </div>
    </div>
  </div>
</template>

<script>

import MapSignUp from '../../Register/MapSignUp.vue'
import FilterMapSelectionArea from "@/components/Register/FilterMapSelectionArea.vue";
export default {
  props: ['showSelectEmplacementModal'],
  data() {
    return {
      emplacement: {
        typeZone: '',
      },
    };
  },
  methods: {
    submitForm() {
      const newEmplacement = {
        typeZone: this.typeZone,
      };
      this.$emit('add-dataEmplacement', newEmplacement);
    },
    handleDataEmplacement(data) {
      console.log(data);
      this.$emit('dataEmplacement', data);
    },
  },
  components: {
    MapSignUp,
    FilterMapSelectionArea
  },
};
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
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  height: 85%;
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
