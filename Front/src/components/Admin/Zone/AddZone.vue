<template>
  <form @submit.prevent="submitForm" class="d-flex gap-3 flex-column justify-content-center">
    <div class="form-group">
      <label for="libelle">{{translate("addZone_libelle")}}</label>
      <input v-model="zone.libelle" id="libelle" :placeholder="translate('label_placeholder')" class="form-control">
    </div>
    <div class="form-group">
      <label for="couleur_hexa">{{translate("addZone_couleur")}}</label>
      <input v-model="zone.couleur_hexa" id="couleur_hexa" type="color" class="form-control">
    </div>
    <div class="form-group">
      <label for="type_zone_libelle">{{translate("addZone_typeZone")}}</label>
      <select v-model="zone.id_type_zone" id="type_zone_libelle" class="form-control">
        <option v-for="type in getAllTypeZone" :key="type.id_type_zone" :value="type.id_type_zone">{{ type.libelle }}</option>
      </select>
    </div>
    <button type="submit" class="btn btn-success">{{translate("addZone_1")}}</button>
    <router-link to="/admin/zones/" class="btn btn-danger">{{translate("addZone_2")}}</router-link>
  </form>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {translate} from "../../../lang/translationService";

export default {
  data() {
    return {
      zone: {
        libelle: "",
        couleur_hexa: "",
        id_type_zone: null,
        type_zone_libelle: "",
      },
    };
  },
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    //...mapGetters(["getAllTypeZone"]),
    ...mapGetters('ZoneEtType', ['getAllTypeZone'])
  },
  methods: {
    translate,
    //...mapActions(["getTypeZonesStore", "createZoneStore"]),
    ...mapActions('ZoneEtType', ['getTypeZonesStore', 'createZoneStore']),
    async loadData(){
      try {
        if (this.getAllTypeZone.length === 0)
          await this.getTypeZonesStore();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    async submitForm() {
      try {
        let typeZone = this.getAllTypeZone.find(type => type.id_type_zone === this.zone.id_type_zone);
        if (typeZone)
          this.zone.type_zone_libelle = typeZone.libelle;

        console.log("Données de la zone :", this.zone);
        await this.createZoneStore(this.zone);
        await this.$router.push('/admin/zones/');
      } catch (error) {
        console.error("Erreur lors de la création de la zone :", error);
      }
    }

  }
};
</script>
