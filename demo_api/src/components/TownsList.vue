<template>
  <div>
    <h1>Villes</h1>
    <hr>
    <div style="display: flex">
      <div style="width: 25%">
        <button @click="getTowns">Obtenir la liste des villes</button>
      </div>
      <div style="width: 75%" align="left">
        <ul>
          <li v-for="(town, index) in towns" :key="index">{{town}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'TownsList',
  computed: {
    ...mapState(['towns'])
  },
  methods: {
    ...mapActions(['getTowns']),
  },
}
</script>

