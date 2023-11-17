<template>
  <div>
    <transition name="modal-animation">
      <div v-if="modalActive" class="overlay">
        <transition name="modal-animation-inner">
          <div class="modal-inner">
            <button class="close-btn" @click="$emit('close')">×</button>
            <div class="modal-content">
              <h1>{{ stand.nom_stand }}</h1>
              <p>{{ stand.description_stand }}</p>
            </div>
            <button type="button" class="btn btn-success">Prestations</button>

          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['modalActive', 'stand']
};
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
  backdrop-filter: blur(5px); /* Effet de flou sur l'arrière-plan, pas sur la modal */
  z-index: 1000; /* Assurez-vous que l'overlay est au-dessus des autres éléments */
}

.modal-inner {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001; /* Plus élevé que l'overlay pour éviter le flou */
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