import Vue from 'vue'
import Vuex from 'vuex'

import {getAllCharacters} from "@/services/persos.service";
import {getAllTowns} from "@/services/towns.service";
import {getAllItems, getItemById, getItemByName, updateItemPrice} from "@/services/items.service";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    towns: [],
    characters: [],
    items: [],
    currentItem: null,
  },
  getters: {
  },
  mutations: {
    setTowns(state, towns) {
      state.towns.splice(0)
      towns.forEach(t => state.towns.push(t))
    },
    setCharacters(state, characters) {
      state.characters.splice(0)
      characters.forEach(p => state.characters.push(p))
    },
    setItems(state, items) {
      state.items.splice(0)
      items.forEach(i => state.items.push(i))
    },
    setCurrentItem(state, item) {
      state.currentItem = item
    },
    setCurrentItemPrice(state, price) {
      state.currentItem.prix = price
    },
    updateItem(state, item) {
      // remplace l'item dans items, dont l'id correspond à item._id fournit en paramètre
      let idx = state.items.findIndex(e => e._id === item._id)
      if (idx !== -1) {
        state.items.splice(idx,1,item)
      }
    }
  },
  actions: {
    async getCharacters({commit}) {
      console.log("STORE: get all characters")
      let result = null
      try {

        result = await getAllCharacters()
        if (result.error === 0) {
          commit('setCharacters',result.data)
        }
        else {
          console.log(result.data)
        }
      }
      catch(err) {
        console.log("Cas anormal dans getCharacters()")
      }
    },
    async getTowns({commit}) {
      console.log("STORE: get all towns")
      let result = null
      try {
        result = await getAllTowns()
        if (result.error === 0) {
          commit('setTowns',result.data)
        }
        else {
          console.log(result.data)
        }
      }
      catch(err) {
        console.log("Cas anormal dans getTowns()")
      }
    },
    async getItems({commit}) {
      console.log("STORE: get all items")
      let result = null
      try {
        result = await getAllItems()
        if (result.error === 0) {
          commit('setItems',result.data)
        }
        else {
          console.log(result.data)
        }
      }
      catch(err) {
        console.log("Cas anormal dans getItems()")
      }
    },
    async getItemById({commit}, id) {
      let result = null
      try {
        result = await getItemById(id)
        if (result.error === 0) {
          commit('setCurrentItem',result.data)
        }
        else {
          console.log(result.data)
        }
      }
      catch(err) {
        console.log("Cas anormal dans getItemById()")
      }
    },
    async getItemByName({commit}, name) {
      let result = null
      try {
        result = await getItemByName(name)
        if (result.error === 0) {
          commit('setCurrentItem',result.data)
        }
        else {
          console.log(result.data)
        }
      }
      catch(err) {
        console.log("Cas anormal dans getItemByName()")
      }
    },
    async updateCurrentItemPrice({state, commit}, price) {
      let result = null
      try {
        result = await updateItemPrice(state.currentItem._id, price)
        if (result.error === 0) {
          // change le prix de l'item courant (i.e. currentItem)
          commit('setCurrentItemPrice',price)
          // change le prix de l'item dans le tableau items, mais en remplaçant complètement l'item
          // avec celui reçu de l'API (=> pas besoin d'une autre mutation)
          commit('updateItem',result.data)
        }
        else {
          console.log(result.data)
        }
      }
      catch(err) {
        console.log("Cas anormal dans updateCurrentItemPrice()")
      }
    },
  },
  modules: {
  }
})
