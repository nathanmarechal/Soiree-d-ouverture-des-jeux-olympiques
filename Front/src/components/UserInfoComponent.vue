<template>
  <div class="container mt-4">
    <h1 class="mb-3">Informations personnelles</h1>
    <div class="card">
      <ul class="list-group list-group-flush">
        <li v-if="!isModifNameModeActive" class="list-group-item">Nom : {{ getCurrentUser.nom }} <button class="btn btn-info btn-sm" @click="setModifNameModeActive">editer</button></li>
        <li v-if="isModifNameModeActive" class="list-group-item"><input required type="text" v-model="newname"><button class="btn btn-info btn-sm" @click="updateName">confirmer</button></li>
        <li v-if="!isModifSurnameModeActive" class="list-group-item">Prénom : {{ getCurrentUser.prenom }} <button class="btn btn-info btn-sm" @click="setModifSurnameModeActive">editer</button></li>
        <li v-if="isModifSurnameModeActive" class="list-group-item"><input required type="text" v-model="newsurname"><button class="btn btn-info btn-sm" @click="updateSurname">confirmer</button></li>
        <li class="list-group-item">solde : {{ getCurrentUser.solde }}       <button class="btn btn-info btn-sm" @click="addMoney">+100</button></li>
        <li v-if="!isModifEmailModeActive" class="list-group-item">Email : {{ getCurrentUser.email }} <button class="btn btn-info btn-sm" @click="setModifEmailModeActive">editer</button></li>
        <li v-if="isModifEmailModeActive" class="list-group-item"><input required type="text" v-model="newemail"><button class="btn btn-info btn-sm" @click="updateEmail">confirmer</button></li>

        <li class="list-group-item">Adresse : {{ getCurrentUser.adresse }}</li>
        <li class="list-group-item">Code postal : {{ getCurrentUser.code_postal }}</li>
        <li class="list-group-item">Ville : {{ getCurrentUser.commune }}</li>
      </ul>
    </div>
  </div>
</template>



<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      newname: "",
      newemail: "",
      newsurname: "",
      modifNameOn: false,
      modifSurnameOn: false,
      modifEmailOn: false,
    }
  },
  computed: {
    ...mapGetters([ "getCurrentUser"]),
    isModifNameModeActive() {
      return this.modifNameOn;
    },
    isModifSurnameModeActive() {
      return this.modifSurnameOn;
    },
    isModifEmailModeActive() {
      return this.modifEmailOn;
    },
  },
  methods: {
    ...mapActions(['updateSoldeStore','updateNomStore','updatePrenomStore','updateEmailStore']),

    setModifNameModeActive() {
      this.modifNameOn = true;
    },
    setModifSurnameModeActive() {
      this.modifSurnameOn = true;
    },
    setModifEmailModeActive() {
      this.modifEmailOn = true;
    },
    setModifNameModeInactive() {
      this.modifNameOn = false;
    },
    setModifSurnameModeInactive() {
      this.modifSurnameOn = false;
    },
    setModifEmailModeInactive() {
      this.modifEmailOn = false;
    },

    addMoney() {
      console.log("ajout de 100€");
      this.updateSoldeStore({id_user: this.getCurrentUser.id_user, solde: this.getCurrentUser.solde + 100})
    },

    updateName() {
      console.log("update name" + this.newname);
      this.updateNomStore({id_user: this.getCurrentUser.id_user, nom: this.newname})
      this.setModifNameModeInactive();
    },

    updateSurname() {
      this.updatePrenomStore({id_user: this.getCurrentUser.id_user, prenom: this.newsurname})
      this.setModifSurnameModeInactive();
    },

    updateEmail() {
      this.updateEmailStore({id_user: this.getCurrentUser.id_user, email: this.newemail})
      this.setModifEmailModeInactive()
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