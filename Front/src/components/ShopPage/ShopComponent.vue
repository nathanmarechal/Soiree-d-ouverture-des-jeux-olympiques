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
          </div>
          <div class="card-footer">
            <div class="buy d-flex justify-content-center align-items-center">
              <div>
                <a @click="selectPrestation(prestation.id_prestation)" class="btn btn-success mt-3">{{ translate("shopC_1") }}</a>
              </div>
              <modal-reservation
                  @close="selectedPrestationId = null"
                  :isReservationSelected="selectedPrestationId === prestation.id_prestation"
                  :prestation="prestation"
                  v-if="selectedPrestationId === prestation.id_prestation"
                  class="invisible-modal">
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
import {translate} from "../../lang/translationService";
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
        const availabilityFilter = prestation.is_available; // Check if the service is available

        return typeFilter && standFilter && availabilityFilter; // Include availability in the filter conditions
      });
    },
  },
  methods: {
    translate,
    ...mapActions(['getPrestationsStore', 'getTypePrestationsStore', 'getStandsStore', 'getCreneauStore']),
    async loadData() {
      if (this.getAllPrestation.length === 0)
        await this.getPrestationsStore()
      if (this.getAllTypePrestation.length === 0)
        await this.getTypePrestationsStore()
      if (this.getAllStand.length === 0)
        await this.getStandsStore()
      if(this.getAllCreneau.length === 0)
        await this.getCreneauStore()

    },

    getTypePrestationLabel(idType) {
      const type = this.getAllTypePrestation.find(type => type.id_type_prestation === idType);
      return type ? type.libelle : 'Type inconnu';
    },
    getImageSrc(imageName) {
      try {
        return require('./../../../../Back/assets/prestation/' + imageName)
      } catch {
        return require('@/assets/arthur-clown.png'); // Image par défaut en cas d'erreur
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
.buy {
  justify-content: center;
}

.card {
  position: relative;
  overflow: auto;
  border-radius: 3vh;
}

.card-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1vh;
  height: 280px; /* Ajoutez une hauteur fixe selon vos besoins */
}

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

.card-text {
  text-align: center;
}
</style>
