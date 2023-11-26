<template>
  <div class="main-card" >
    <div class="card-prestation" v-for="prestation in filteredPrestations" :key="prestation.id_prestation">
        <img :src="getImageSrc(prestation.image)" alt="Image de la prestation" class="card-img">
          <h5 class="card-text">{{ prestation.libelle }}</h5>
          <p class="card-text">Prix : {{ prestation.prix }} €</p>
          <p class="card-text">Type : {{ getTypePrestationLabel(prestation.id_type_prestation) }}</p>
          <p class="card-text">Stand : {{ getStandName(prestation.id_stand) }}</p>

        <div class="d-flex align-content-center">
          <select>
            <option v-for="creneau in getAllCreneau" :key="creneau" >{{ creneau.time }}</option>
          </select>
          <button type="button" class="btn btn-success">Réserver</button>
        </div>
        </div>
      </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
export default {
  data() {
    return {
      prestations : [],
      typePrestations: [],
      stands: [],

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
        return require('@/assets/' + imageName);
      } catch {
        return require('@/assets/' + "arthur-clown.png");
      }

    },
    getStandName(idStand) {
      const stand = this.stands.find(stand => stand.id_stand === idStand);
      return stand ? stand.nom_stand : 'Stand inconnu';
    }
  }
}
</script>


<style scoped>
.main-card {
  display: flex;
  flex-flow: row wrap;
  gap: 1vh;
  justify-content: flex-start;
}
.card-prestation {
  background: #f9f7f7;
  border: black solid 2px;
  width: 25vh;
  height: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1vh;
  border-radius: 3vh;
}
.card-img {
  max-width: 75%;
  max-height: 75%;
  border-radius: 50%;
}
.card-text {
  text-align: center;
}
</style>