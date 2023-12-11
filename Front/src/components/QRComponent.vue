<template>
  <div>
    <qrcode-vue :value="qrValue"></qrcode-vue>
    <span>{{qrValue}}</span><br>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'QRComponent',
  props: ["ligne_commande", "id_commande" ],
  components: {
    QrcodeVue
  },
  data() {
    return {
      qrValue: "http://localhost:8080/validLigneCommande/" + this.ligne_commande.id_presta + "/" + this.ligne_commande.id_creneau + "/" + this.ligne_commande.id_commande
    }
  },
}
</script>

<style scoped>

</style>