<template>
  <div>
    <h1>type de prestation : {{type.libelle}}</h1>
    <h2>description : {{type.description_type_prestation}}</h2>
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
      type : [],
    };
  },
  computed: {
    ...mapGetters(['getSelectedTypePrestation','getAllTypePrestation']),
  },
  methods: {
    ...mapActions(['getTypePrestationsStore']),
    async loadData(){
      if (this.getAllTypePrestation.length === 0){
        await this.getTypePrestationsStore()
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