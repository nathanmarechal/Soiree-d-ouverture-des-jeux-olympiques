<!--cette page est utilisée dans tout les cruds quand le crud à des liens avec d'autres éléments (ex role et user) pour proteger le del-->

<template>
  <div>
    <protected-data></protected-data>
    <list-of-data-to-delete></list-of-data-to-delete>
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
      dataToDelete: [],
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
    ...mapGetters(['getAllRoles', 'getAllUsers']),
  },
  methods: {
    ...mapActions(['getRolesStore', 'getUsersStore']),
    async loadData() {
      try {
        await this.getRolesStore();
        await this.getUsersStore();
        await this.getTypeOfDataToProtect();
        await this.getDataToDelete();
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    async getTypeOfDataToProtect(){
      switch (this.dataType) {
        case 'role':
          this.dataToProtect = this.getAllRoles.find(role => role.id_role === this.dataToNameLater.id_role);
          break;
        case 'user':
          this.dataToProtect = this.getAllUsers.find(user => user.id_role === this.dataToNameLater.id_role);
          break;
        default:
          console.error('Erreur lors du chargement des données');
          break;
      }
      console.log("data to protect", this.dataToProtect);
    },
    async getDataToDelete(){
      switch (this.dataType) {
        case 'role':
          this.dataToDelete = this.getAllUsers.filter(user => user.id_role === this.dataToNameLater.id_role);
          break;
        case 'user':
          this.dataToDelete = this.getAllUsers.filter(user => user.id_user === this.dataToNameLater.id_user);
          break;
        default:
          console.error('Erreur lors du chargement des données');
          break;
      }
      console.log("data to delete", this.dataToDelete);
    },
  }
}
</script>
 
<style>

</style>