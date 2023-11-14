<template>
  <div>
    <div>
      <h1>Items</h1>
      <hr>
      <div style="display: flex">
        <div style="width: 25%">
          <button @click="getItems">rafraichir la liste des items</button>
          <hr>
          Item par id: <input :value="itid" @change="searchItemById($event.target.value)">
          <hr>
          Item par nom: <input :value="itname" @change="searchItemByName($event.target.value)">
          <hr>
          <div v-if="currentItem">
            {{currentItem.nom}}, prix : <input :value="currentItem.prix" @change="setItemPrice($event.target.value)">
          </div>
          {{currentItem}}
        </div>
        <div style="width: 75%" align="left">
          <ul>
            <li v-for="(item, index) in items" :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'

export default {
  name: 'ItemsList',
  data: () => {
    return {
      itname:'',
      itprice:'',
      itid:'',
    }
  },
  computed: {
    ...mapState(['items','currentItem']),
  },
  methods: {
    ...mapMutations(['updateItem','setCurrentItemPrice']),
    ...mapActions(['getItems','getItemByName','getItemById','updateCurrentItemPrice']),
    searchItemById(id) {
      this.itid = id
      this.getItemById(id)
    },
    searchItemByName(name) {
      this.itname = name
      this.getItemByName(name)
    },
    setItemPrice(price) {
      let p = Number(price)
      if ((isNaN(p)) || (p<0)) {
        alert('entrer un prix valide >= 0')
        // change 2x la valeur pour forcer le réaffichage du champ de saisie
        let p = this.currentItem.prix
        // NB: setCurrentItemPrice est une mutation => pas d'appel à l'API, juste modif du store.
        this.setCurrentItemPrice(0)
        this.setCurrentItemPrice(p)
      }
      else {
        this.updateCurrentItemPrice(p)
      }
    }
  },
  mounted() {
    this.getItems()
  }
}
</script>

