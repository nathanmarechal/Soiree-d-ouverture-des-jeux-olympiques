<template>
  <div>
    <h1>Personnages</h1>
    <hr>
    <div style="display: flex">
      <div style="width: 25%">
        <button @click="getCharacters">Obtenir la liste des personnages</button>
      </div>
      <div style="width: 75%" align="left">
        <ul>
          <li v-for="(perso, index) in characters" :key="index">{{perso}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'PersosList',
  computed: {
    ...mapState(['characters'])
  },
  methods: {
    ...mapActions(['getCharacters']),
  },
}
</script>

