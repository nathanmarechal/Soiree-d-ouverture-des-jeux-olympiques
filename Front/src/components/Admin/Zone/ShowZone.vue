<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th>{{translate("showZone_1")}}</th>
        <th>{{translate("showZone_2")}}</th>
        <th>{{translate("showZone_3")}}</th>
        <th>{{translate("showZone_4")}}</th>
        <th>{{translate("showZone_5")}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(zone, index) in getAllZone" :key="index">
        <td>{{ zone.id_zone }}</td>
        <td>{{ zone.libelle }}</td>
        <td>
          <div class="cercle" :style="{ background: zone.couleur_hexa }"></div>
        </td>
        <td>{{ zone.type_zone_libelle }}</td>
        <td>
          <router-link :to="{ name: 'AdminEditZoneView', params: { selected_zone: zone } }" class="btn btn-primary">{{translate("showZone_6")}}</router-link>
          <button class="btn btn-danger" @click="zoneDelete(index)">{{translate("showZone_7")}}</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {translate} from "../../../lang/translationService";
//import { deleteZone } from '@/services/map.service';

export default {
  /*
  data () {
    return {
      //zones: [],
    }
  },

   */
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
    //this.zones = await this.getZones();
  },
  computed: {
    ...mapGetters(['getAllZone']),
  },
  methods: {
    translate,
    ...mapActions(['getZonesStore', 'deleteZoneStore']),
    async loadData() {
      if (this.getAllZone.length === 0)
        await this.getZonesStore();
    },
    async zoneDelete(index) {
      const zone = this.getAllZone[index];
      const  confirmMessage1 = this.translate("showZone_ConfirmDeleteMessage")
      const confirmMessage = confirmMessage1+` ${zone.libelle} ?`;
      if (window.confirm(confirmMessage)) {
        try {
          await this.deleteZoneStore(zone.id_zone);
          //this.getAllZone.splice(index, 1);
        } catch (error) {
          console.error('Erreur lors de la suppression de la zone :', error);
        }
      }
      //await this.loadData();
    }
  },
}
</script>

<style scoped>
.cercle {
  width: 2vh;
  height: 2vh;
  border-radius: 50%; /* Pour un cercle parfait */
  border: 2px solid black; /* Optionnel, pour une bordure subtile */
  display: inline-block; /* Assure que le div se comporte comme un élément en ligne */
}
</style>



