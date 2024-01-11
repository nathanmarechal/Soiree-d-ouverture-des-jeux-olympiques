<template>
  <div>
    <transition name="modal-animation" >
      <div v-if="modalActive" class="overlay">
        <transition name="modal-animation-inner">
          <div class="modal-inner" >
            <img :src="getImageSrc(stand.image_stand)" alt="Image du stand" />
            <div class="modal-content">
              <h1>{{ stand.nom_stand }}</h1>
              <div v-html="stand.description_stand"></div>
            </div>
            <button type="button" class="btn btn-success" @click="goToStore(stand)">Prestations</button>
            <button type="button" class="btn btn-danger" @click="$emit('close')">Fermer</button>

          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['modalActive', 'stand'],
  data() {
    return {
      selectedStand: [],
    };
  },

  methods: {
    updateFilterj(stand) {
      let newSelection = [...this.selectedStand];

      const index = newSelection.findIndex(t => t.id_stand === stand.id_stand);
      if (index === -1) {
        newSelection.push(stand.id_stand);
      } else {
        newSelection.splice(index, 1);
      }

      this.$store.commit('prestationEtType/SET_SELECTED_TYPE_PRESTATION', []);
      this.$store.commit('stands/SET_SELECTED_STANDS', []);
      this.$store.commit('stands/SET_SELECTED_STANDS', newSelection);

    },
    getImageSrc(imageName) {
      try {
        console.log(imageName)
        return require('./../../../../Back/assets/stand/profile/' + imageName)
      } catch {
        return require('@/assets/clown.png'); // Image par défaut en cas d'erreur
      }
    },

    goToStore(stand){
      this.updateFilterj(stand)
      this.$store.commit('user/SET_PROVENANCE', 1)
      this.$router.push({ name: 'shopView'});
    },
  }
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
  align-items: center; /* Centrer les éléments à l'intérieur de la modale */
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}

.modal-inner img {
  border-radius: 15px; /* Bords arrondis pour l'image */
  max-width: 25vh; /* Assurez-vous que l'image ne dépasse pas la largeur de la modale */
  margin-bottom: 20px; /* Espacement entre l'image et le texte */
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
