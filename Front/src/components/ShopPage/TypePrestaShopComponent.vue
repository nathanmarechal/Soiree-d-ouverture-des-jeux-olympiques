<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <h1 style="font-size: 500%"> type de prestation : {{type.libelle}}  </h1>
        <p style="font-size: 200%" > {{type.description_type_prestation}}</p>
      </div>
      <div class="col-md-6 d-flex justify-content-center align-items-center">
        <img style="width: 80%; height: 80%;" class="img-fluid" :src="getImageSrc(type.image)" alt="Image du type" />
  </div>
</div>
    <h2>toutes les prestations proposées par {{type.libelle}} :</h2>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TypePrestaShopComponent",
  data() {
    return {
      id_type : this.getSelectedTypePrestation,
      type : null,
    };
  },
  computed: {
    //...mapGetters(['getSelectedTypePrestation','getAllTypePrestation']),
    ...mapGetters('prestationEtType', ['getSelectedTypePrestation', 'getAllTypePrestation']),
  },
  methods: {
    //...mapActions(['getTypePrestationsStore']),
    ...mapActions('prestationEtType', ['getTypePrestationsStore']),
    async loadData(){
      if (this.getAllTypePrestation.length === 0){
        await this.getTypePrestationsStore()
      }
    },
    getImageSrc(imageName) {
      try {
        return require('@/assets/infoPage/' + imageName);
      } catch {
        return require('@/assets/' + "4.png");
      }
    },

  },
  async created() {
    this.id_type = this.getSelectedTypePrestation[0];
    await this.loadData();
    this.type = this.getAllTypePrestation.find(type => type.id_type_prestation === this.id_type);

  },
};

</script>


<style scoped>

</style>