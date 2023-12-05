<template>
 <div>
   <table class="table table-striped">
     <thead>
     <tr>
       <th scope="col">date</th>
       <th scope="col">Prix</th>
       <th scope="col">etat de la commande</th>
       <th scope="col">nombre de prestations</th>
     </tr>
     </thead>
     <tbody>
     <tr v-for="item in commande" :key="item.id_commande">
       <td>{{convertDateFormat(item.date_commande)}}</td>
       <td>{{ item.prix_total }} €</td>
       <td>{{item.libelle}}</td>
       <td>{{item.nbr_presta}}</td>

       <button class="btn btn-info">voir le détail</button>
     </tr>
     </tbody>
   </table>
 </div>
</template>

<script>


import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      commande : this.$store.state.userCourant.commandes,
    }
  },
  computed: {
    ...mapGetters(['getCommandeUserCourantGetters', "getCurrentUser"]),
  },
  // this.getCommandeUserCourantStore(this.getCurrentUser.id_user)
      //     .then(res=>{
      //       console.log("commande : ", res)
      //       this.$store.commit('SET_COMMANDES_USER_COURANT', res)
      //     })
  methods: {
    ...mapActions(['getCommandeUserCourantStore']),

    convertDateFormat(dateString) {
      try {
        // Séparer la chaîne de date en parties
        const parts = dateString.split(' ');
        if (parts.length < 4) {
          throw new Error('Format de date invalide');
        }

        // Extraire les composants nécessaires
        const day = parts[2];
        const monthName = parts[1];
        const timePart = parts[3];

        // Convertir le nom du mois en numéro
        const months = {
          "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
          "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
        };
        const month = months[monthName];

        // Extraire les heures et les minutes
        const [hours, minutes] = timePart.split(':');

        // Assembler le format final
        return `${day}/${month} - ${hours}:${minutes}`;
      } catch (error) {
        console.error(error);
        return dateString;
      }
    }

  }


}

</script>

<style scoped>

</style>