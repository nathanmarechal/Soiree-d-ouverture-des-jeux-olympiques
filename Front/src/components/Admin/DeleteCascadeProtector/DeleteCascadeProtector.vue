<!--cette page est utilisée dans tout les cruds quand le crud à des liens avec d'autres éléments (ex role et user) pour proteger le del-->

<template>
  <div><br><br><br>
    <protected-data :dataProp="dataToProtect" :dataType="dataToProtectType"></protected-data>
    <p>-------------------------------------------------------------------------</p>
    <list-of-data-to-delete :dataProp="dataToDelete" :dataType="dataToDeleteType" :previousDataType="previousDataType" :previousDataId="previousDataId" :isLevel2="isLevel2" @goBack="handleGoBack" @NeedProtection="handleNeedProtection"></list-of-data-to-delete>
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
    isLevel2Prop: {
      type: Boolean,
      required: false,
      default: false,
    },
    previousDataTypeProp: {
      type: String,
      required: false,
      default: () => null,
    },
    previousDataIdProp: {
      type: Array,
      required: false,
      default: () => null,
    },
  },
  data() {
    return {
      dataToProtect: [],
      //dataToProtectType is the type of the data that need to be protected
      dataToProtectType: '',
      //dataToDelete is the data that need to be deleted
      dataToDelete: [],
      //dataToDeleteType is the type of the data that need to be deleted
      dataToDeleteType: '',
      //previousDataType is the previous type of data that was protected (ex: if we are protecting a role, the previousDataType is user), it is used if we need to delete a level 2 data then go back to the data before and even before that
      previousDataType: '',
      //isLevel2 is used to know if we are deleting a level 2 data (ex: if we are deleting a role and we need to delete the user that has this role and this user has a stand, we need to delete the stand too which is a level 2 data)
      isLevel2: false,
      //previousDataId allow us to know which data we need to protect if there were no dataToProtect (number)
      previousDataId: null,
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
    ...mapGetters('roleEtDroit', ['getAllRoles']),
    ...mapGetters('user', ['getAllUsers']),
    ...mapGetters('stands', ['getAllStand']),
    ...mapGetters('emplacements', ['getAllArea']),
    ...mapGetters('ZoneEtType', ['getAllTypeZone', 'getAllZone']),  },
  methods: {
    ...mapActions('roleEtDroit', ['getRolesStore']),
    ...mapActions('user', ['getUsersStore']),
    ...mapActions('stands', ['getStandsStore']),
    ...mapActions('emplacements', ['getAreasStore']),
    ...mapActions('ZoneEtType', ['getTypeZonesStore', 'getZonesStore']),    async loadData() {
      try {
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
      if (this.isLevel2Prop){
        this.isLevel2 = this.isLevel2Prop;
      }
      if (this.previousDataTypeProp){
        this.previousDataType = this.previousDataTypeProp;
      }
      if (this.previousDataIdProp){
        this.previousDataId = this.previousDataIdProp;
      }
      if (this.previousDataId == null || this.previousDataType == ''){
        this.dataToProtect = this.dataProp;
        this.dataToProtectType = this.dataType;
      }else{
        switch (this.previousDataType) {
          case 'role':
            this.dataToProtect = this.getAllRoles.find(role => role.id_role === this.previousDataId);
            this.dataToProtectType = 'role';
            break;
          case 'user':
            this.dataToProtect = this.getAllUsers.find(user => user.id_user === this.previousDataId);
            this.dataToProtectType = 'user';
            break;
          case 'zone':
            this.dataToProtect = this.getAllZone.find(zone => zone.id_zone === this.previousDataId);
            this.dataToProtectType = 'zone';
            break;
          case 'area':
            this.dataToProtect = this.getAllArea.find(area => area.id_emplacement === this.previousDataId);
            this.dataToProtectType = 'area';
            break;
          default: 
            console.error('Erreur lors du chargement des données');
            break;
        }
      }
      await this.getAllDataToDelete();
    },
    async getAllDataToDelete(){
      let id;
      let data;
      switch (this.dataToProtectType) {
        case 'role':
          id = this.dataToProtect.id_role;
          data = this.getAllUsers.filter(user => user.id_role === id);
          this.dataToDelete = data;
          this.dataToDeleteType = 'user';
          this.previousDataType = 'role';
          this.previousDataId = id;
          break;
        case 'user':
          id = this.dataToProtect.id_stand;
          data = this.getAllStand.filter(stand => stand.id_stand === id);
          this.dataToDelete = data;
          this.dataToDeleteType = 'stand';
          if (this.previousDataType === 'role'){
            this.isLevel2 = true;
          }else this.previousDataType = 'user';
          break;
        case 'zone':
          id = this.dataToProtect.id_zone;
          data = this.getAllArea.filter(area => area.id_zone === id);
          this.dataToDelete = data;
          this.dataToDeleteType = 'area';
          this.previousDataType = 'zone';
          this.previousDataId = id;
          break;
        case 'area':
          id = this.dataToProtect.id_emplacement;
          data = this.getAllStand.filter(stand => stand.id_emplacement === id);
          this.dataToDelete = data;
          this.dataToDeleteType = 'stand';
          if (this.previousDataType === 'zone'){
            this.isLevel2 = true;
          }else this.previousDataType = 'area';
          break;
        default: 
          console.error('Erreur lors du chargement des données');
          break;
      }
    },
    async handleNeedProtection(data) {
      this.dataToProtect = data.dataProp;
      this.dataToProtectType = data.dataType;
      this.getAllDataToDelete();
      window.alert('OH NO RECURSIVITE')

    },
    async handleGoBack(data) {
      this.isLevel2 = data.isLevel2;
      this.previousDataType = data.previousDataType;
      this.previousDataId = data.previousDataId;
      switch (this.previousDataType) {
          case 'role':
            this.dataToProtect = this.getAllRoles.find(role => role.id_role === this.previousDataId);
            this.dataToProtectType = 'role';
            break;
          case 'user':
            this.dataToProtect = this.getAllUsers.find(user => user.id_user === this.previousDataId);
            this.dataToProtectType = 'user';
            break;
          case 'zone':
            this.dataToProtect = this.getAllZone.find(zone => zone.id_zone === this.previousDataId);
            this.dataToProtectType = 'zone';
            break;
          case 'area':
            this.dataToProtect = this.getAllArea.find(area => area.id_emplacement === this.previousDataId);
            this.dataToProtectType = 'area';
            break;
          default: 
            console.error('Erreur lors du chargement des données');
            break;
        }
      this.getAllDataToDelete();
    },
  }
}
</script>
 
<style>

</style>