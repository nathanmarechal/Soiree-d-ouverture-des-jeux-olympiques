import Vue from 'vue'
import Vuex from 'vuex'

import {getAllUsers} from "@/services/utilisateur.service";

Vue.use(Vuex)

import area_json from '../datasources/areas.json'

export default new Vuex.Store({
  state: {
    isLoginOpen: false,
    isUserConnected: false,
    email: '',
    password: '',
    selectedType: [],
    selectedZone: [],
    prestations: [
      {"id_prestation": 1, "libelle": "Prestation 1", "prix": "241.92 €", "id_type_prestation": 2, "id_stand": 8, "creneau_horaire": "2023-11-14 16:00:00", "image": "1.jpeg"},
      {"id_prestation": 2, "libelle": "Prestation 2", "prix": "153.07 €", "id_type_prestation": 6, "id_stand": 9, "creneau_horaire": "2023-11-12 15:00:00", "image": "1.jpg"},
      {"id_prestation": 3, "libelle": "Prestation 3", "prix": "250.20 €", "id_type_prestation": 5, "id_stand": 2, "creneau_horaire": "2023-11-17 20:00:00", "image": "2.jpeg"},
      {"id_prestation": 4, "libelle": "Prestation 4", "prix": "274.50 €", "id_type_prestation": 3, "id_stand": 2, "creneau_horaire": "2023-11-17 14:00:00", "image": "2.jpg"},
      {"id_prestation": 5, "libelle": "Prestation 5", "prix": "119.02 €", "id_type_prestation": 3, "id_stand": 4, "creneau_horaire": "2023-11-12 16:00:00", "image": "11.jpg"},
      {"id_prestation": 6, "libelle": "Prestation 6", "prix": "395.64 €", "id_type_prestation": 4, "id_stand": 5, "creneau_horaire": "2023-11-14 19:00:00", "image": "drink.jpg"},
      {"id_prestation": 7, "libelle": "Prestation 7", "prix": "331.67 €", "id_type_prestation": 4, "id_stand": 2, "creneau_horaire": "2023-11-12 15:00:00", "image": "mma-besancon.png"},
      {"id_prestation": 8, "libelle": "Prestation 8", "prix": "448.16 €", "id_type_prestation": 2, "id_stand": 1, "creneau_horaire": "2023-11-11 12:00:00", "image": "3.png"},
      {"id_prestation": 9, "libelle": "Prestation 9", "prix": "215.66 €", "id_type_prestation": 3, "id_stand": 5, "creneau_horaire": "2023-11-20 10:00:00", "image": "kebab-semih.png"},
      {"id_prestation": 10, "libelle": "Prestation 10", "prix": "457.62 €", "id_type_prestation": 2, "id_stand": 1, "creneau_horaire": "2023-11-14 08:00:00", "image": "dqzdzqdz"}
    ],
    typePrestations: [
      {"id_type_prestation": 1, "libelle": "nourriture"},
      {"id_type_prestation": 2, "libelle": "boisson"},
      {"id_type_prestation": 3, "libelle": "fanzone"},
      {"id_type_prestation": 4, "libelle": "billetterie"},
      {"id_type_prestation": 5, "libelle": "magasin"},
      {"id_type_prestation": 6, "libelle": "Activité"},
      {"id_type_prestation": 7, "libelle": "International"},
      {"id_type_prestation": 8, "libelle": "Transport"}
    ],
    zones:[
      {
        "id_zone": 1,
        "libelle": "Tuillerie"
      },
      {
        "id_zone": 2,
        "libelle": "Champs de Mars"
      },
      {
        "id_zone": 3,
        "libelle": "Jardin des plantes"
      },
      {
        "id_zone": 4,
        "libelle": "Seine"
      }
    ],
  areas : area_json.areas,
  },
  getters: {
    isLoginOpen: state => state.isLoginOpen,
    isUserConnected: state => state.isUserConnected,
    getemail: state => state.email,
    getpassword: state => state.password,
    getallPrestations: state => state.prestations,
    getallType: state => state.typePrestations,
    getAllStands: state => state.typePrestations,
    getSelectedType: state => state.selectedType,
    getallZone: state => state.zones,
    getSelectedZone: state => state.selectedZone,
    getAreas: state=> state.areas
  },
  mutations: {


    setUsers(state, users) {
      state.users.splice(0)
      users.forEach(p => state.users.push(p))
    },


    SET_LOGIN_MODAL(state, value) {
      state.isLoginOpen = value;
    },
    SET_USER_CONNECTED(state, value) {
      state.isUserConnected = value;
    },
    SET_EMAIL(state, value) {
      state.email = value;
    },
    SET_PASSWORD(state, value) {
      state.password = value;
    },
    SET_PRESTATIONS(state, prestations) {
      state.prestations = prestations;
    },
    SET_SELECTED_TYPE(state, type) {
      state.selectedType = type;
    },
    SET_SELECTED_ZONE(state, zone) {
      state.selectedZone = zone;
    },
  },
  actions: {

    async getUsers({commit}) {
      console.log("STORE: get all users")
      let result = null
      try {
        result = await getAllUsers()
        if (result.error === 0) {
          commit('setUsers',result.data)
        }
        else {
          console.log(result.data)
        }
      }
      catch(err) {
        console.log("Cas anormal dans getUsers()")
      }
    },

    //changeSelectedType({ commit }, type) {
    //  commit('SET_SELECTED_TYPE', type); Si jamais on a besoin de faire de l'asynchrone
    //},
      //fetchPrestations({ commit }) {
      // Logique d'appel à l'API pour récupérer les prestations
      // Par exemple, utiliser axios pour faire une requête GET
      // puis commit('SET_PRESTATIONS', responseData)
     //}
  },
  modules: {
    // autres modules si nécessaire
  }
})