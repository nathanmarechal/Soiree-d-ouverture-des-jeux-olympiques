<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Panier</h1>
        <p>{{getCurrentUser.solde}}</p>
        <button @click="ajouterdufric" >+ 100 balles</button>
      </div>
    </div>
    <div class="alert alert-success" role="alert" v-if="getPanierUserCourant.length === 0">
        Le panier est vide
    </div>
    <div v-else class="row">
      <div class="col-12">
        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prix</th>
            <th scope="col">Quantité</th>
            <th scope="col">Créneau horaire</th>
            <th scope="col">Total</th>
            <th scope="col">Supprimer</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in getPanierUserCourant" :key="item.id_prestation">
            <td>{{ item.libelle }}</td>
            <td>{{ item.prix }} €</td>
            <td v-if="!isEditModeActive">{{ item.quantite }}</td>
            <td v-if="isEditModeActive"><input required type="number" v-model.number="nouvellesQuantites[item.id_prestation]" min="1">
            </td>
            <td>{{ item.heure_creneau }}</td>
            <td> {{ item.prix * item.quantite }} €</td>
            <td>
              <button class="btn btn-danger" @click="deleteLigne(item.id_prestation, item.id_creneau)">Supprimer</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h2 class="text-center">Total : {{ calculateTotal() }} €</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-success" @click="validerPanier()" >Valider le panier</button>
          <button  v-if="!isEditModeActive" class="btn btn-info" style="margin-left: 2%" @click="modifierPanier()" >modifier le panier</button>
          <button v-if="isEditModeActive" class="btn btn-info" style="margin-left: 2%" @click="confirmerModifPanier()" >confirmer les modifications</button>

      </div>
    </div>
  </div>
</template>


<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  data() {
    return {
      modifOn : false,
      nouvellesQuantites: {},
    }
  },

  computed: {
    ...mapGetters(['getPanierUserCourant', "getCurrentUser", 'getAllPrestation', 'getAllStand']),
    isEditModeActive() {
      return this.modifOn;
    }
  },
  methods: {
    ...mapActions(['deletePrestationFromPanierUserCourantStore']),
    ...mapMutations(['ADD_SCHEDULE']),
    deleteLigne(id_prestation, id_creneau) {
      console.log("delete ligne :" + id_prestation + " " + id_creneau + " dans le vue");
      this.deletePrestationFromPanierUserCourantStore({id_user : this.getCurrentUser.id_user, id_prestation :id_prestation, id_creneau: id_creneau});
    },
    calculateTotal() {
      const panier = this.getPanierUserCourant;
      let total = 0;

      for (const item of panier) {
        total += item.prix * item.quantite;
      }

      return total;
    },


    ...mapActions(['getCreneauStore', "updateQuantityInPanierStore", "addCommandeFromPanierStore", "getCommandeUserCourantStore", "getPanierUserCourantStore", "updateSoldeStore"]),

    ajouterdufric(){
      this.updateSoldeStore({id_user : this.getCurrentUser.id_user, solde : this.getCurrentUser.solde + 100})
    },

    modifierPanier() {
      this.getPanierUserCourant.forEach(item => {
        this.nouvellesQuantites[item.id_prestation] = item.quantite;
      });
      this.modifOn = true;
    },

    async validerPanier(){
      if(this.getCurrentUser.solde < this.calculateTotal()){
        alert("Votre solde est insuffisant")
        return;
      }
      console.log("valider panier" + this.getCurrentUser.id_user)
      if(this.getPanierUserCourant.length === 0){
        console.log(this.getPanierUserCourant.length)
        alert("Votre panier est vide")
        return;
      }

      this.getPanierUserCourant.forEach(item => {
        console.log(JSON.stringify(item) + " dans le vue");
        this.ADD_SCHEDULE({
          id_creneau: item.id_creneau,
          heure_creneau: item.heure_creneau,
          libelle: item.libelle,
          nom_stand: this.getAllStand.find(stand => stand.id_stand === this.getAllPrestation.find(prestation => prestation.id_prestation).id_stand ).nom_stand,
        });
      });

      let newSolde = this.getCurrentUser.solde - this.calculateTotal();
      await this.updateSoldeStore({id_user: this.getCurrentUser.id_user, solde: newSolde})
      await this.addCommandeFromPanierStore(this.getCurrentUser.id_user);
      await this.getCommandeUserCourantStore(this.getCurrentUser.id_user);
      this.$store.commit('SET_PANIER_USER_COURANT', [])

    },

    confirmerModifPanier() {
       Object.keys(this.nouvellesQuantites).forEach(id_prestation => {
        console.log("Contenu actuel du panier:", this.getPanierUserCourant);
        const quantite = this.nouvellesQuantites[id_prestation];
        console.log("Nouvelle quantité pour id_prestation", id_prestation, ":", quantite);
        const id_user = this.getCurrentUser.id_user;
        const item = this.getPanierUserCourant.find(item => item.id_prestation === Number(id_prestation));
        console.log("Item avec id_prestation", id_prestation)
        if (item) {
          const id_creneau = item.id_creneau;
          this.updateQuantityInPanierStore({ id_user, id_prestation, quantite, id_creneau });
        } else {
          console.error("Item avec id_prestation", id_prestation, "non trouvé dans le panier");
        }
      });
      this.modifOn = false;
      console.log("Modifications du panier confirmées");
    },
  },
}

</script>


<style scoped>

</style>