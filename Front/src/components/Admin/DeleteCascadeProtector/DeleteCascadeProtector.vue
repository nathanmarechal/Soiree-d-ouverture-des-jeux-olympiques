<!--cette page est utilisée dans tout les cruds quand le crud à des liens avec d'autres éléments (ex role et user) pour proteger le del-->

<template>
  <div>
    <p>MONKE</p><br><br><br>
    <protected-data :dataProp="dataToProtect" :dataType="dataToProtectType"></protected-data>
    <p>-------------------------------------------------------------------------</p>
    <list-of-data-to-delete :dataProp="dataToDelete" :dataType="dataToDeleteType"></list-of-data-to-delete>
  </div>
</template>

<script>
import ProtectedData from "./ProtectedData.vue";
import ListOfDataToDelete from "./ListOfData.vue";
import { mapActions, mapGetters } from "vuex";


export default {
  components: {
    ProtectedData,
    ListOfDataToDelete
  },
  props: {
    dataProp: {
      type: Object,
      required: true,
    },
    dataType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dataToProtect: [],
      dataToProtectType: '',
      dataToDelete: [],
      dataToDeleteType: '',
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
    ...mapGetters(['getAllRoles', 'getAllUsers', 'getAllStand', 'getAllArea', 'getAllTypeZone', 'getAllZone']),
  },
  methods: {
    ...mapActions(['getRolesStore', 'getUsersStore', 'getStandsStore', 'getAreasStore', 'getTypeZonesStore', 'getZonesStore', 'deleteRoleStore', 'deleteUserStore', 'deleteStandStore', 'deleteAreaStore', 'deleteTypeZoneStore', 'deleteZoneStore']),
    async loadData() {
      try {
        console.log("props data", this.dataProp);
        console.log("data type", this.dataType);
        await this.getRolesStore();
        await this.getUsersStore();
        await this.getStandsStore();
        await this.getAreasStore();
        await this.getTypeZonesStore();
        await this.getZonesStore();
        await this.getAllData();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    async getAllData(){
      this.dataToProtect = this.dataProp;
      this.dataToProtectType = this.dataType;
      await this.getAllDataToDelete();
    },
    async getAllDataToDelete(){
      let id;
      let data;
      switch (this.dataToProtectType) {
        case 'role':
          id = this.dataProp.id_role;
          data = this.getAllUsers.filter(user => user.id_role === id);
          console.log("all data", id, data);
          this.dataToDelete = data;
          this.dataToDeleteType = 'user';
          break;
        case 'user':
          id = this.dataProp.id_stand;
          data = this.getAllStand.filter(stand => stand.id_stand === id);
          this.dataToDelete = data;
          this.dataToDeleteType = 'stand';
          break;
        default: 
          console.error('Erreur lors du chargement des données');
          break;
      }
      console.log("data to protect", this.dataToProtect);
    },
  }
}
</script>
 
<style>

</style>