<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      newname: this.getCurrentUser.nom,
      newemail: this.getCurrentUser.email,
      newsurname: this.getCurrentUser.prenom,
      newadresse: this.getCurrentUser.adresse,
      newcode_postal: this.getCurrentUser.code_postal,
      newcommune: this.getCurrentUser.commune,
    }
  },
  created() {
    this.newname = this.getCurrentUser.nom;
    this.newemail = this.getCurrentUser.email;
    this.newsurname = this.getCurrentUser.prenom;
    this.newadresse = this.getCurrentUser.adresse;
    this.newcode_postal = this.getCurrentUser.code_postal;
    this.newcommune = this.getCurrentUser.commune;
  },
  computed: {
    ...mapGetters(["getCurrentUser"]),
  },
  methods: {
    ...mapActions(['updateUserCourantWoPasswordStore']),
    cancelEdit() {
      this.updateUserCourantWoPasswordStore({
        id_user: this.getCurrentUser.id_user,
        nom: this.newname,
        prenom: this.newsurname,
        email: this.newemail,
        adresse: this.newadresse,
        code_postal: this.newcode_postal,
        commune: this.newcommune,
      });
      this.$emit('edit-finished');
    },
  }

}
</script>

<template>
  <div class="container mt-4">
    <h1 class="mb-3">Informations personnelles</h1>
    <div class="card">
      <ul class="list-group list-group-flush">
        <li  class="list-group-item">Nom :<input required type="text" v-model="newname"> </li>
        <li  class="list-group-item">Prénom : <input required type="text" v-model="newsurname"> </li>
        <li  class="list-group-item">Email : <input required type="text" v-model="newemail"> </li>
        <li  class="list-group-item">Adresse : <input required type="text" v-model="newadresse"></li>
        <li  class="list-group-item">Code postal : <input required type="text" v-model="newcode_postal"></li>
        <li  class="list-group-item">Ville : <input required type="text" v-model="newcommune"></li>
      </ul>
      <button class="btn btn-info btn-sm" @click="cancelEdit">Valider</button>
    </div>
  </div>
</template>

<style scoped>

</style>