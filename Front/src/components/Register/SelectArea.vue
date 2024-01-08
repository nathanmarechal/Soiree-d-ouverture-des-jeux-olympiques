<template>
  <div v-if="modalActiveAreaSelection" class="overlay">
    <div class="modal-inner">
      <div class="d-flex justify-content-center">
          <div class="d-flex flex-row gap-3 justify-content-between" style="height: 60vh;width: 100vh">
            <FilterMapSelectionArea style="width: 25%"/>
            <MapSignUp @dataEmplacement="handleDataEmplacement" style="width: 70%; height: 100%"/>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import MapSignUp from "@/components/Register/MapSignUp.vue";
import FilterMapSelectionArea from "@/components/Register/FilterMapSelectionArea.vue";

export default {
  props:['modalActiveAreaSelection'],
  components: {
    MapSignUp,
    FilterMapSelectionArea
  },
  methods: {
    handleDataEmplacement(id_emplacement) {
      this.$emit('dataEmplacement', id_emplacement);
    }
  }
}

</script>

<style scoped>

.filter-map{
  width: 60vh;
  margin-top: 10vh;
  margin-bottom: 5vh;
  height: 70vh;
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
  align-items: center; /* Centrer les éléments à l'intérieur de la modale */
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}


</style>
