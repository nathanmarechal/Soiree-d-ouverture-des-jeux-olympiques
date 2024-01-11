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
        <td>{{ getTypeZoneLibelle(zone.id_type_zone) }}</td>
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
import router from "@/router";

export default {
  async mounted() {
    try {
      await this.loadData();
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  },
  computed: {
    ...mapGetters('ZoneEtType', ['getAllZone', 'getAllTypeZone']),
    ...mapGetters('emplacements', ['getAllArea']),
  },
  methods: {
    translate,
    ...mapActions('ZoneEtType', ['getZonesStore', 'deleteZoneStore', 'getTypeZonesStore']),
    ...mapActions('emplacements', ['getAreasStore']),
    async loadData() {
      if (this.getAllZone.length === 0)
        await this.getZonesStore();
      if (this.getAllArea.length === 0)
        await this.getAreasStore();
      if (this.getAllTypeZone.length === 0)
        await this.getTypeZonesStore();
    },
    getTypeZoneLibelle(id_type_zone) {
      const typeZone = this.getAllTypeZone.find(type => type.id_type_zone === id_type_zone);
      if (typeZone)
        return typeZone.libelle;
      return '';
    },
    async zoneDelete(index) {
      const zone = this.getAllZone[index];
      const  confirmMessage1 = this.translate("showZone_ConfirmDeleteMessage")
      const confirmMessage = confirmMessage1+` ${zone.libelle} ?`;
      if (window.confirm(confirmMessage)) {
        const ifHasArea = this.getAllArea.filter(area => area.id_zone === zone.id_zone);
        if (ifHasArea != null && ifHasArea.length > 0) {
          window.alert('ALERTEALERTeALERT')
              if (this.$route.name !== 'AdminDeleteCascadeProtector') {
                router.push(
                  {
                    name: 'AdminDeleteCascadeProtector',
                    params: {
                      dataType: 'zone',
                      dataProp: zone,
                    },
                  }
                );
                return;
              }else{
                this.$emit('NeedProtection', {dataProp: zone, dataType: 'zone'});
              }

        }
        else{
          try {
            await this.deleteZoneStore(zone.id_zone);
          } catch (error) {
            console.error('Erreur lors de la suppression de la zone :', error);
          }
        }
      }
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



