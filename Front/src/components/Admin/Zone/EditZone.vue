<template>
  <form @submit.prevent="submitForm()" class="d-flex gap-3 flex-column justify-content-center">
    <div class="form-group">
      <label for="libelle">{{translate("editZone_libelle")}}</label>
      <input v-if="$store.getters.getLang==='fr'" v-model="zone.libelle" id="libelle" placeholder="Libellé" class="form-control">
      <input v-if="$store.getters.getLang==='en'" v-model="zone.libelle" id="libelle" placeholder="Label" class="form-control">
    </div>
    <div class="form-group">
      <label for="couleur_hexa">{{ translate("editZone_couleur") }}</label>
      <input v-model="zone.couleur_hexa" id="couleur_hexa" type="color" class="form-control">
    </div>
    <div class="form-group">
      <label for="type_zone_libelle">{{ translate("editZone_typeZone") }}</label>
      <select v-model="zone.id_type_zone" id="type_zone_libelle" class="form-control">
        <option v-for="type in getAllTypeZone" :key="type.id_type_zone" :value="type.id_type_zone">{{ type.libelle }}</option>
      </select>
    </div>
    <button type="submit" class="btn btn-success">{{translate("editZone_1")}}</button>
    <router-link to="/admin/zones/" class="btn btn-danger">{{translate("editZone_2")}}</router-link>
  </form>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {translate} from "../../../lang/translationService";

export default {
  props: ["selected_zone"],
  data() {
    return {
      zone: {},
    };
  },
  async mounted() {
    try {
      this.zone = this.selected_zone;
      await this.loadData();
      /*
      this.type_zones = await this.getTypesZone();
      const zoneArray = await getZoneById(this.id_zone);
      this.zone = zoneArray.length > 0 ? zoneArray[0] : {};
       */
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters(["getAllTypeZone"]),
  },
  methods: {
    translate,
    ...mapActions(["getTypeZonesStore", "updateZoneStore"]),
    async loadData(){
      try {
        if (this.getAllTypeZone.length === 0)
            await this.getTypeZonesStore();
        /*
        const zoneArray = await getZoneById(this.id_zone);
        this.zone = zoneArray.length > 0 ? zoneArray[0] : {};

         */
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },

    async submitForm() {
      try {
        console.log("Données de la zone :", this.zone);
        await this.updateZoneStore({id : this.zone.id_zone, body : {
          libelle: this.zone.libelle,
          couleur_hexa: this.zone.couleur_hexa,
          id_type_zone: this.zone.id_type_zone,
        }});
        await this.$router.push('/admin/zones/'); // Redirect to '/admin/zones/' after successful update
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la zone :', error);
      }
    }

  }
};
</script>
