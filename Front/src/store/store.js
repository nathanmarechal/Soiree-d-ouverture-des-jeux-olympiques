import Vue from 'vue'
import Vuex from 'vuex'

import {getAllUsers, getAllRoles} from "@/services/utilisateur.service";
import {getAllAreas, getAllZones, getAllTypeZone} from "@/services/map.service";
import {getAllPrestations, getAllTypePrestations} from "@/services/prestation.service";
import {getAllStands} from "@/services/stand.service";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users : [],
        email: '',
        password: '',
        userCourant: {
            "session_id": null,
            "id_user": null,
            "nom": null,
            "email": null,
            "prenom": null,
            "code_postal": null,
            "adresse": null,
            "commune": null,
            "panier": null,
            "role": null,
        },
        areaSelectedForStand: null,
        roles : [],
        isLoginOpen: false,
        isUserConnected: false,

        selectedType: [],
        selectedZone: [],
        minPrice: 0,
        maxPrice: 0,
        searchQuery: '',

        selectedStands: [],
        selectedTypeZones: [],
        typeZone: [],
        zones: [],
        areas : [],

        prestations: [],
        typePresations: [],
        stands: [],
    },

    getters: {
        getAllZone: state => state.zones,
        getSelectedZone: state => state.selectedZone,
        getSelectedType: state => state.selectedType,
        getSelectedStands : state => state.selectedStands,
        getMinPrice: state => state.minPrice,
        getMaxPrice: state => state.maxPrice,
        getSearchQuery: state => state.searchQuery,

        getAllUser : state => state.users,
        getAllRole : state => state.roles,

        getAllTypePrestation: state => state.typePresations,
        getAllPrestation: state => state.prestations,
        getAllStand: state => state.stands,

      isLoginOpen: state => state.isLoginOpen,

      isUserConnected: state => state.isUserConnected,
      getemail: state => state.email,
      getpassword: state => state.password,

      getAllTypeZone: state => state.typeZone,
      getAllRoles: state => state.roles,
      getAreas: state=> state.areas,
      getSessionId: state => state.sessionId,
      getAreaSelectedForStand: state=> state.areaSelectedForStand,
      getSelectedTypeZones: state=> state.selectedTypeZones,
    },

    mutations: {

        SET_CURRENT_USER(state, users) {
          state.users.splice(0)
          users.forEach(p => state.users.push(p))
        },

        SET_USERS(state, users) {
            state.users.splice(0)
            users.forEach(p => state.users.push(p))
        },

        SET_ZONES(state, zones) {
            state.zones.splice(0)
            zones.forEach(p => state.zones.push(p))
        },

        SET_AREAS(state, areas) {
            state.areas.splice(0)
            areas.forEach(p => state.areas.push(p))
        },

        SET_ROLES(state, roles) {
          state.roles = roles;
        },

        SET_TYPE_ZONE(state, typeZone) {
          state.typeZone = typeZone;
        },

        SET_LOGIN_MODAL(state, value) {
          state.isLoginOpen = value;
        },

        SET_SESSION_ID(state,sessionId) {
           state.sessionId = sessionId;
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

        SET_TYPE_PRESTATIONS(state, typePresations) {
            state.typePresations = typePresations;
        },

        SET_STANDS(state, stands) {
            state.stands = stands;
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

        SET_SELECTED_TYPE_ZONES(state, typeZones) {
            state.selectedTypeZones = typeZones;
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
        SET_SELECTED_AREA(state, area){
            state.areaSelectedForStand = area;
        }

    },

    actions: {

        async getRoles({ commit }) {
          try {
            const roles = await getAllRoles();
              //if (result.error === 0) {
              if (Array.isArray(roles)) {
              commit('SET_ROLES', roles);
            } else {
              console.error("Unexpected response format:", roles);
            }
          } catch (err) {
            console.error("Error in getRoles():", err);
          }
        },

        async getTypeZone({ commit }) {
          try {
            const typeZone = await getAllTypeZone();
            if (Array.isArray(typeZone)) {
              commit('SET_TYPE_ZONE', typeZone);
            } else {
              console.error("Unexpected response format:", typeZone);
            }
          } catch (err) {
            console.error("Error in getTypeZone():", err);
          }
        },


        async getUsers({ commit }) {
          try {
              const result = await getAllUsers();
              if (Array.isArray(result)) {
                  commit('SET_USERS', result);
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
              if (Array.isArray(result)) {
                  commit('SET_ZONES', result);
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
              if (Array.isArray(result)) {
                  commit('SET_AREAS', result);
              } else {
                  console.error("Unexpected response format:", result);
              }
          } catch (err) {
              console.error("Error in getAreas():", err);
          }
        },

        async getPrestations({ commit }) {
          try {
              const result = await getAllPrestations();
              if (Array.isArray(result)) {
                  commit('SET_PRESTATIONS', result);
              } else {
                  console.error("Unexpected response format:", result);
              }
          } catch (err) {
              console.error("Error in getPrestations():", err);
          }
        },

        async getTypePrestations({ commit }) {
          try {
              const result = await getAllTypePrestations();
              if (Array.isArray(result)) {
                  commit('SET_TYPE_PRESTATIONS', result);
              } else {
                  console.error("Unexpected response format:", result);
              }
          } catch (err) {
              console.error("Error in getTypePrestations():", err);
          }
        },

        async getStands({ commit }) {
          try {
              const result = await getAllStands();
              if (Array.isArray(result)) {
                  commit('SET_STANDS', result);
              } else {
                  console.error("Unexpected response format:", result);
              }
          } catch (err) {
              console.error("Error in getStands():", err);
          }
        }
    },
    modules: {
      //autres modules si nécessaire
    }
})





