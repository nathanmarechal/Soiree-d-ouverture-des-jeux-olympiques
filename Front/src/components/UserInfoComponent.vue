<template>
  <div class="container mt-4">
    <h1 class="mb-3">{{translate("infoPersos_1")}}</h1>
    <div class="card">
      <ul class="list-group list-group-flush">
        <li  class="list-group-item">{{translate("infoPersos_2")}}{{ getCurrentUser.nom }} </li>
        <li  class="list-group-item">{{translate("infoPersos_3")}}{{ getCurrentUser.prenom }} </li>
        <li class="list-group-item">{{translate("infoPersos_4")}}{{ getCurrentUser.solde }} </li>
        <li  class="list-group-item">{{translate("infoPersos_5")}}{{ getCurrentUser.email }} </li>
        <li  class="list-group-item">{{translate("infoPersos_6")}}{{ getCurrentUser.adresse }}</li>
        <li  class="list-group-item">{{translate("infoPersos_7")}}{{ getCurrentUser.code_postal }}</li>
        <li  class="list-group-item">{{translate("infoPersos_8")}}{{ getCurrentUser.commune }}</li>
      </ul>
      <button class="btn btn-info btn-sm" @click="editMode">{{translate("infoPersos_9")}}</button>
    </div>
  </div>
</template>



<script>
import {mapActions, mapGetters} from "vuex";
import {translate} from "../lang/translationService";

export default {
  data() {
    return {
      newname: "",
      newemail: this.getCurrentUser.email,
      newsurname: this.getCurrentUser.prenom,
      newadresse: this.getCurrentUser.adresse,
      newcode_postal: this.getCurrentUser.code_postal,
      newcommune: this.getCurrentUser.commune,

      modifOn: false,
    }
  },
  computed: {
    //...mapGetters(["getCurrentUser"]),
    ...mapGetters('user', ["getCurrentUser"]),
    },
    methods: {
      translate,
      //...mapActions(['updateSoldeStore', 'updateUserCourantWoPasswordStore']),
      ...mapActions('user', ['updateSoldeStore', 'updateUserCourantWoPasswordStore']),
      editMode(){
        this.$emit('edit-initiated');
      },
    }
}
</script>

<style scoped>

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}

.container {
  max-width: 600px;
}

.card {
  background-color: #f8f9fa;
  border: 1px solid #e3e3e3;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.list-group-item {
  font-size: 16px;
  color: #333;
}

.list-group-item:nth-of-type(odd) {
  background-color: #f2f2f2;
}
</style>