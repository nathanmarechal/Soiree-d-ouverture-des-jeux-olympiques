<template>
   <div class="row">
      <div class="col-md-4 mb-3" v-for="prestation in filteredPrestations" :key="prestation.id_prestation">
        <div class="card">
          <img :src="getImageSrc(prestation.image)" class="card-img-top size" alt="Image de la prestation">
          <div class="card-body">
            <h5 class="card-title">{{ prestation.libelle }}</h5>
            <p class="card-text">Prix : {{ prestation.prix }}</p>
            <p class="card-text">Type : {{ getTypePrestationLabel(prestation.id_type_prestation) }}</p>
            <p class="card-text">Stand : {{ prestation.id_stand }}</p>
            <p class="card-text">Créneau : {{ prestation.creneau_horaire }}</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      selectedTypes: {}
    };
  },
  computed: {
    ...mapGetters(['getallPrestations', "getallType"]),
    filteredPrestations() {
      if (Object.keys(this.$store.state.selectedType).every(key => !this.$store.state.selectedType[key])) {
        return this.getallPrestations;
      }
      return this.getallPrestations.filter(prestation =>
          this.$store.state.selectedType[prestation.id_type_prestation]
      );
    },
  },
  methods: {
    getTypePrestation(idType) {
      const typePrestationMap = this.$store.getters.getallType;
      return typePrestationMap[idType];
    },
    getTypePrestationLabel(idType) {
      const type = this.getallType.find(type => type.id_type_prestation === idType);
      return type ? type.libelle : 'Type inconnu';
    },
    getImageSrc(imageName) {
      try {
        return require('@/assets/' + imageName);
      } catch {
        return require('@/assets/' + "4.png");
      }
    }
  }
}
</script>


<style scoped>

.size{
  height: 300px;
}

</style>