<template>
   <div class="row">
      <div class="col-md-4 mb-3" v-for="prestation in filteredPrestations" :key="prestation.id_prestation">
        <div class="card">
          <img :src="getImageSrc(prestation.image)" class="card-img-top size" alt="Image de la prestation">
          <div class="card-body">
            <h5 class="card-title">{{ prestation.libelle }}</h5>
            <p class="card-text">Prix : {{ prestation.prix }}</p>
            <p class="card-text">Type : {{ getTypePrestationLabel(prestation.id_type_prestation) }}</p>
            <p class="card-text">Stand : {{ getStandName(prestation.id_stand) }}</p>
            <p class="card-text">Créneau : {{ prestation.creneau_horaire }}</p>
          </div>
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
    ...mapGetters(["getSelectedStands", "getSelectedTypePrestation"]),
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
        return require('@/assets/' + "4.png");
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

.size{
  height: 300px;
}

</style>