<template>
  <div>
    <div class="display-card">
      <div class="card-main" ref="cardMains" v-for="prestation in filteredPrestations" :key="prestation.id_prestation">
        <div class="card" style="border-radius: 3vh">
          <img :src="getImageSrc(prestation.image)" alt="Image de la prestation" class="card-img-top">
          <div class="card-body">
            <h5 class="card-text">{{ prestation.libelle }}</h5>
            <p class="card-text">Prix : {{ prestation.prix }} €</p>
            <p class="card-text">Type : {{ getTypePrestationLabel(prestation.id_type_prestation) }}</p>
            <p class="card-text">Stand : {{ getStandName(prestation.id_stand) }}</p>

            <div class="buy d-flex justify-content-between align-items-center">
              <a @click="selectPrestation(prestation.id_prestation)" class="btn btn-success mt-3">Réserver</a>

              <modal-reservation
                  @close="selectedPrestationId = null"
                  :isReservationSelected="selectedPrestationId === prestation.id_prestation"
                  :prestation="prestation"
                   v-if="selectedPrestationId === prestation.id_prestation">
              </modal-reservation>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import ModalReservation from '@/components/ShopPage/ModalReservation.vue'
export default {
  components: {
    ModalReservation
  },
  data() {
    return {
      //prestations : [],
      //typePrestations: [],
      //stands: [],
      selectedPrestationId: null,
    }
  },
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
    //this.prestations = await this.getPrestations();
    //this.typePrestations = await this.getTypePrestations();
    //this.stands = await this.getStands();
    this.equalizeCardHeights();
  },
  computed: {
    ...mapGetters(["getSelectedStands", "getSelectedTypePrestation", "getAllPrestation", "getAllTypePrestation", "getAllStand", "getAllCreneau"]),
    filteredPrestations() {
      return this.getAllPrestation.filter(prestation => {
        const isTypeSelected = this.getSelectedTypePrestation.length > 0;
        const isStandSelected = this.getSelectedStands.length > 0;

        const typeFilter = isTypeSelected ? this.getSelectedTypePrestation.includes(prestation.id_type_prestation) : true;
        const standFilter = isStandSelected ? this.getSelectedStands.includes(prestation.id_stand) : true;

        return typeFilter && standFilter;
      });
    },
  },
  methods: {
    ...mapActions(['getPrestationsStore', 'getTypePrestationsStore', 'getStandsStore', 'getCreneauStore']),
    async loadData() {
      if (this.getAllPrestation.length === 0)
        await this.getPrestationsStore()
      if (this.getAllTypePrestation.length === 0)
        await this.getTypePrestationsStore()
      if (this.getAllStand.length === 0)
        await this.getStandsStore()

      await this.getCreneauStore()
      console.log(this.getAllCreneau)

    },

    getTypePrestationLabel(idType) {
      const type = this.getAllTypePrestation.find(type => type.id_type_prestation === idType);
      return type ? type.libelle : 'Type inconnu';
    },
    getImageSrc(imageName) {
      try {
        return require('@/assets/stand/' + imageName);
      } catch {
        return require('@/assets/' + "arthur-clown.png");
      }
    },
    getStandName(idStand) {
      const stand = this.getAllStand.find(stand => stand.id_stand === idStand);
      return stand ? stand.nom_stand : 'Stand inconnu';
    },
    selectPrestation(id) {
      this.selectedPrestationId = id;
    },
    equalizeCardHeights() {
      this.$nextTick(() => {
        let maxCardBodyHeight = 0;
        this.$refs.cardMains.forEach(cardMain => {
          const cardBody = cardMain.querySelector('.card-body');
          if (cardBody.clientHeight > maxCardBodyHeight) {
            maxCardBodyHeight = cardBody.clientHeight;
          }
        });
        this.$refs.cardMains.forEach(cardMain => {
          const cardBody = cardMain.querySelector('.card-body');
          cardBody.style.height = maxCardBodyHeight + 'px';
        });
      });
    },
  },
}
</script>


<style scoped>
.display-card {
  display: flex;
  flex-wrap: wrap;
  gap: 1vh;
}

.card-main {
  width: 20vh;
  min-height: 300px; /* Hauteur minimale */
}

.card-img-top {
  width: 100%;
  object-fit: cover;
  border-radius: 3vh;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1vh;
}

.card-text {
  text-align: center;
}
</style>
