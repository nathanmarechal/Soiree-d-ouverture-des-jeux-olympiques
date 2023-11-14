<template>
  <div id="app">
    <table>
      <tr>
        <td>
          <button @click="changeIndex(0)">Villes</button>
        </td>
        <td>
          <button @click="changeIndex(1)">Personnages</button>
        </td>
        <td>
          <button @click="changeIndex(2)">Items</button>
        </td>
      </tr>
    </table>
    <div v-if="index===0">
      <TownsList></TownsList>
    </div>
    <div v-else-if="index===1">
      <PersosList></PersosList>
    </div>
    <div v-else-if="index===2">
      <ItemsList></ItemsList>
    </div>
  </div>
</template>

<script>
import TownsList from "@/components/TownsList";
import PersosList from "@/components/PersosList";
import ItemsList from "@/components/ItemsList";
export default {
  name: 'App',
  components: {
    ItemsList,
    TownsList,
    PersosList,
  },
  data: () => ({
    index:-1
  }),
  methods: {
    changeIndex(index) {
      this.index = index
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
