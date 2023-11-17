import Vue from 'vue'
import Vuex from 'vuex'

import {getAllUsers} from "@/services/utilisateur.service";
import {getAllAreas} from "@/services/map.service";
import {getAllZones} from "@/services/map.service";

Vue.use(Vuex)

//import area_json from '../datasources/areas.json'
//import zone_json from '../datasources/zones.json'

export default new Vuex.Store({
  state: {
    users: [],
    isLoginOpen: false,
    isUserConnected: false,
    email: '',
    password: '',
      selectedType: [],
      selectedZone: [],
      selectedStands: [],
      minPrice: 0,
      maxPrice: 0,
      searchQuery: '',

    prestations: [
      {"id_prestation": 1, "libelle": "Prestation 1", "prix": "241.92 €", "id_type_prestation": 2, "id_stand": 1, "creneau_horaire": "2023-11-14 16:00:00", "image": "1.jpeg"},
      {"id_prestation": 2, "libelle": "Prestation 2", "prix": "153.07 €", "id_type_prestation": 6, "id_stand": 1, "creneau_horaire": "2023-11-12 15:00:00", "image": "1.jpg"},
      {"id_prestation": 3, "libelle": "Prestation 3", "prix": "250.20 €", "id_type_prestation": 5, "id_stand": 1, "creneau_horaire": "2023-11-17 20:00:00", "image": "2.jpeg"},
      {"id_prestation": 4, "libelle": "Prestation 4", "prix": "274.50 €", "id_type_prestation": 3, "id_stand": 2, "creneau_horaire": "2023-11-17 14:00:00", "image": "2.jpg"},
      {"id_prestation": 5, "libelle": "Prestation 5", "prix": "119.02 €", "id_type_prestation": 3, "id_stand": 2, "creneau_horaire": "2023-11-12 16:00:00", "image": "11.jpg"},
      {"id_prestation": 6, "libelle": "Prestation 6", "prix": "395.64 €", "id_type_prestation": 4, "id_stand": 3, "creneau_horaire": "2023-11-14 19:00:00", "image": "drink.jpg"},
      {"id_prestation": 7, "libelle": "Prestation 7", "prix": "331.67 €", "id_type_prestation": 4, "id_stand": 3, "creneau_horaire": "2023-11-12 15:00:00", "image": "mma-besancon.png"},
      {"id_prestation": 8, "libelle": "Prestation 8", "prix": "448.16 €", "id_type_prestation": 2, "id_stand": 4, "creneau_horaire": "2023-11-11 12:00:00", "image": "3.png"},
      {"id_prestation": 9, "libelle": "Prestation 9", "prix": "215.66 €", "id_type_prestation": 3, "id_stand": 4, "creneau_horaire": "2023-11-20 10:00:00", "image": "kebab-semih.png"},
      {"id_prestation": 10, "libelle": "Prestation 10", "prix": "457.62 €", "id_type_prestation": 2, "id_stand": 5, "creneau_horaire": "2023-11-14 08:00:00", "image": "dqzdzqdz"}
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
    zones: [],
    areas : [],
      stands: [
          {
              "id_stand" : 1,
              "nom_stand" : "azer",
              "image_stand" :"" ,
              "description_stand" : "zedzdqdqzdqzd" ,
              "date_achat" : "",
              "prix" : "",
              "id_emplacement" :"",
          },
          {
              "id_stand" : 2,
              "nom_stand" : "azer2",
              "image_stand" :"" ,
              "description_stand" : "zedzdqdqzdqzd" ,
              "date_achat" : "",
              "prix" : "",
              "id_emplacement" :"",

          },
          {
              "id_stand" : 3,
              "nom_stand" : "azer3",
              "image_stand" :"" ,
              "description_stand" : "zedzdqdqzdqzd" ,
              "date_achat" : "",
              "prix" : "",
              "id_emplacement" :"",

          },
          {
              "id_stand" : 4,
              "nom_stand" : "azer4",
              "image_stand" :"" ,
              "description_stand" : "zedzdqdqzdqzd" ,
              "date_achat" : "",
              "prix" : "",
              "id_emplacement" :"",

          },
          {
              "id_stand" : 5,
              "nom_stand" : "azer5",
              "image_stand" :"" ,
              "description_stand" : "zedzdqdqzdqzd" ,
              "date_achat" : "",
              "prix" : "",
              "id_emplacement" :"",
          }]
  },

  getters: {
      isLoginOpen: state => state.isLoginOpen,
      isUserConnected: state => state.isUserConnected,
      getemail: state => state.email,
      getpassword: state => state.password,
      getallPrestations: state => state.prestations,
      getallType: state => state.typePrestations,
      getAllStands: state => state.stands,
      getSelectedStands : state => state.selectedStands,
      getSelectedType: state => state.selectedType,
      getallZone: state => state.zones,
      getSelectedZone: state => state.selectedZone,
      getAreas: state=> state.areas,
      getMinPrice: state => state.minPrice,
      getMaxPrice: state => state.maxPrice,
      getSearchQuery: state => state.searchQuery},
  mutations: {

    setUsers(state, users) {
      state.users = users;
    },

    /*
    setUsers(state, users) {
      state.users.splice(0)
      users.forEach(p => state.users.push(p))
    },

     */

    setZones(state, zones) {
        state.zones.splice(0)
        zones.forEach(p => state.zones.push(p))
    },

    setAreas(state, areas) {
        state.areas.splice(0)
        areas.forEach(p => state.areas.push(p))
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
      SET_SELECTED_STANDS(state, stands) {
          state.selectedStands = stands;
          },
      SET_MIN_PRICE(state, price) {
          state.minPrice = price;
      },
      SET_MAX_PRICE(state, price) {
          state.maxPrice = price;
      },
      SET_SEARCH_QUERY(state, query) {
          state.searchQuery = query;
      },

  },
  actions: {

      /*
    async getUsers({commit}) {
        console.log("STORE: get all users")
        let result = null
        try {
            result = await getAllUsers()
            console.log("Response from getAllUsers:", result);

            if (result.error === 0) {
              console.log("Dans le if : ", result.data)
              commit('setUsers',result.data)
            }
            else {
              console.log("Dans le else : ", result.data)
            }
        }
        catch(err) {
        console.log("Cas anormal dans getUsers()")
        }
    },

       */

    async getUsers({ commit }) {
      try {
          const result = await getAllUsers();
          if (Array.isArray(result)) {
              commit('setUsers', result);
          } else {
              console.error("Unexpected response format:", result);
          }
      } catch (err) {
          console.error("Error in getUsers():", err);
      }
    },

    async getZones({ commit }) {
      try {
          const result = await getAllZones();
          console.log("Response from getAllZones:", result)
          if (Array.isArray(result)) {
              commit('setZones', result);
          } else {
              console.error("Unexpected response format:", result);
          }
      } catch (err) {
          console.error("Error in getZones():", err);
      }
    },

    async getAreas({ commit }) {
      try {
          const result = await getAllAreas();
            console.log("Response from getAllAreas:", result)
          if (Array.isArray(result)) {
              commit('setAreas', result);
          } else {
              console.error("Unexpected response format:", result);
          }
      } catch (err) {
          console.error("Error in getAreas():", err);
      }
    },

  },
  modules: {
    // autres modules si nécessaire
  }
})