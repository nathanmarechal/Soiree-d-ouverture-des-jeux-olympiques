<template>
  <div>
    <div class="display-card">
      <div class="card-main" v-for="prestation in filteredPrestations" :key="prestation.id_prestation">
        <div class="card" style="border-radius: 3vh">
          <img :src="getImageSrc(stands[prestation.id_stand].image_stand)" alt="Image de la prestation" class="card-img-top">
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
      prestations : [],
      typePrestations: [],
      stands: [],
      selectedPrestationId: null,


    //prestation : [],
    }
  },
  async mounted() {
    this.prestations = await this.getPrestations();
    this.typePrestations = await this.getTypePrestations();
    this.stands = await this.getStands();
  },
  computed: {
    ...mapGetters(["getSelectedStands", "getSelectedTypePrestation", 'getAllCreneau']),
    filteredPrestations() {
      return this.prestations.filter(prestation => {
        const isTypeSelected = this.getSelectedTypePrestation.length > 0;
        const isStandSelected = this.getSelectedStands.length > 0;

        const typeFilter = isTypeSelected ? this.getSelectedTypePrestation.includes(prestation.id_type_prestation) : true;
        const standFilter = isStandSelected ? this.getSelectedStands.includes(prestation.id_stand) : true;

        return typeFilter && standFilter;
      });
    },
  },
  methods: {
    ...mapActions(['getPrestations', 'getTypePrestations', 'getStands']),
    getTypePrestationLabel(idType) {
      const type = this.typePrestations.find(type => type.id_type_prestation === idType);
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
      const stand = this.stands.find(stand => stand.id_stand === idStand);
      return stand ? stand.nom_stand : 'Stand inconnu';
    },
    selectPrestation(id) {
      this.selectedPrestationId = id;
    },
  },
}
</script>


<style scoped>

.display-card{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1vh;
}

.card-main{
  width: 20vh;
}
.card-img-top {
  width: 100%;    /* Hauteur maximale de l'image */
  object-fit: cover;   /* Garde l'aspect ratio tout en remplissant le cadre */
  border-radius: 3vh;
}


.card-body{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1vh;
}
.card-text {
  text-align: center;
}
</style>