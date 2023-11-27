import Vue from 'vue'
import Vuex from 'vuex'

import {getAllUsers, getAllRoles} from "@/services/utilisateur.service";
import {getAllAreas, getAllZones, getAllTypeZone} from "@/services/map.service";
import {getAllPrestations, getAllTypePrestations} from "@/services/prestation.service";
import {getAllStands} from "@/services/stand.service";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

        //email: '',
        //password: '',
        //sessionId: '',

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
            "id_role": null,
        },

        creneau: [
            {"id_creneau": 1, "time": "16h00"},
            {"id_creneau": 2, "time": "16h30"},
            {"id_creneau": 3, "time": "17h00"},
            {"id_creneau": 4, "time": "17h30"},
            {"id_creneau": 5, "time": "18h00"},
            {"id_creneau": 6, "time": "18h30"},
            {"id_creneau": 7, "time": "19h00"},
            {"id_creneau": 8, "time": "19h30"},
            {"id_creneau": 9, "time": "20h00"},
            {"id_creneau": 10, "time": "20h30"},
            {"id_creneau": 11, "time": "21h00"},
            {"id_creneau": 12, "time": "21h30"},
            {"id_creneau": 13, "time": "22h00"},
            {"id_creneau": 14, "time": "22h30"},
            {"id_creneau": 15, "time": "23h00"},
            {"id_creneau": 16, "time": "23h30"},
            {"id_creneau": 17, "time": "00h00"},
            {"id_creneau": 18, "time": "00h30"},
            {"id_creneau": 19, "time": "01h00"},
            {"id_creneau": 20, "time": "01h30"},
            {"id_creneau": 21, "time": "02h00"},
            {"id_creneau": 22, "time": "02h30"},
            {"id_creneau": 23, "time": "03h00"}
        ],

        //users : [],
        //roles : [],
        //typeZone: [],
        //zones: [],
        //areas : [],
        //stands: [],
        //prestations: [],
        //typePresations: [],


        areaSelectedForStand: null,
        isLoginOpen: false,
        isUserConnected: false,

        selectedZone: [],
        searchQuery: '',
        selectedTypeZones: [],


        selectedTypePrestation: [],
        selectedStands: [],
        provenance : null,


    },

    getters: {

        //getAllZone: state => state.zones,
        //getAllUser : state => state.users,
        //getAllRole : state => state.roles,
        //getAllTypeZone: state => state.typeZone,
        //getAllAreas: state=> state.areas,
        //getAllStand: state => state.stands,
        //getAllTypePrestation: state => state.typePresations,
        //getAllPrestation: state => state.prestations,
        //getemail: state => state.email,
        //getpassword: state => state.password,
        //getSessionId: state => state.sessionId,

        getAllCreneau: state => state.creneau,
        getProvenance : state => state.provenance,
        getCurrentUser: state => state.userCourant,

        getSelectedZone: state => state.selectedZone,
        getSelectedTypePrestation: state => state.selectedTypePrestation,
        getSelectedStands : state => state.selectedStands,
        getSearchQuery: state => state.searchQuery,

        isLoginOpen: state => state.isLoginOpen,

        isUserConnected: state => state.isUserConnected,

        getAreaSelectedForStand: state=> state.areaSelectedForStand,
        getSelectedTypeZones: state=> state.selectedTypeZones,
    },

    mutations: {

        //SET_USERS(state, users) {
        //    state.users.splice(0)
        //    users.forEach(p => state.users.push(p))
        //},

        //SET_ROLES(state, roles) {
        //  state.roles = roles;
        //},

        //SET_ZONES(state, zones) {
        //    state.zones.splice(0)
        //    zones.forEach(p => state.zones.push(p))
        //},

        //SET_AREAS(state, areas) {
        //    state.areas.splice(0)
        //    areas.forEach(p => state.areas.push(p))
        //},

        //SET_TYPE_ZONE(state, typeZone) {
        //  state.typeZone = typeZone;
        //},

        //SET_STANDS(state, stands) {
        //    state.stands = stands;
        //},

        //SET_TYPE_PRESTATIONS(state, typePresations) {
        //    state.typePresations = typePresations;
        //},

        //SET_PRESTATIONS(state, prestations) {
        //    state.prestations = prestations;
        //},

        //SET_EMAIL(state, value) {
        //    state.email = value;
        //},

        //SET_PASSWORD(state, value) {
        //    state.password = value;
        //},

        //SET_SESSION_ID(state,sessionId) {
        //    state.sessionId = sessionId;
        //},


        SET_PROVENANCE(state, provenance) {
            state.provenance = provenance;
        },

        SET_CURRENT_USER(state, users) {
            state.userCourant = users;
        },

        SET_IS_USER_CONNECTED(state, value) {
            state.isUserConnected = value;
        },

        SET_LOGIN_MODAL(state, value) {
          state.isLoginOpen = value;
        },

        SET_SELECTED_TYPE_PRESTATION(state, type) {
          state.selectedTypePrestation = type;
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

        SET_SEARCH_QUERY(state, query) {
            state.searchQuery = query;
        },
        SET_SELECTED_AREA(state, area){
            state.areaSelectedForStand = area;
        }

    },

    actions: {

        async getUsers(data,session_id) {
            try {
                const users = await getAllUsers(session_id);
                return users; // Return the fetched data
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },

        /*
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
         */

        async getRoles(){
            try {
                const roles = await getAllRoles();
                return roles; // Return the fetched data
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        },

        /*
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
         */

        async getTypesZone(){
            try {
                const typeZone = await getAllTypeZone();
                return typeZone; // Return the fetched data
            } catch (error) {
                console.error('Error fetching typeZone:', error);
            }
        },

        /*
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
         */

        async getZones(){
            try {
                const zones = await getAllZones();
                return zones; // Return the fetched data
            } catch (error) {
                console.error('Error fetching zones:', error);
            }
        },

        /*
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
         */

        async getAreas(){
            try {
                const areas = await getAllAreas();
                return areas; // Return the fetched data
            } catch (error) {
                console.error('Error fetching areas:', error);
            }
        },

        /*
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
         */

        async getStands(){
            try {
                const stands = await getAllStands();
                return stands; // Return the fetched data
            } catch (error) {
                console.error('Error fetching stands:', error);
            }
        },

        /*
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
        },
         */

        async getTypePrestations(){
            try {
                const typePresations = await getAllTypePrestations();
                return typePresations; // Return the fetched data
            } catch (error) {
                console.error('Error fetching typePresations:', error);
            }
        },

        /*
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
         */

        async getPrestations(){
            try {
                const prestations = await getAllPrestations();
                return prestations; // Return the fetched data
            } catch (error) {
                console.error('Error fetching prestations:', error);
            }
        },

        /*
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
         */
    },
    modules: {
      //autres modules si nécessaire
    }
})





