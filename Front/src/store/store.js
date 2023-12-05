import Vue from 'vue'
import Vuex from 'vuex'

import {getAllUsers, getAllRoles, deleteRole, updateRole, createRole, createUser, updateUser, deleteUser} from "@/services/utilisateur.service";
import {getAllAreas, getAllZones, getAllTypeZones, deleteZone, updateZone, createZone, updateArea, deleteArea, createArea} from "@/services/map.service";
import {getAllPrestations, getAllTypePrestations} from "@/services/prestation.service";
import {getAllStands} from "@/services/stand.service";
import {
    addPrestationToPanierUser,
    deletePrestationFromPanierUser,
    getAllCreneaux,
    getPanierUserCourant,
    updateQuantityInPanier
} from "@/services/panier.service";
import {getCommandeUserCourant} from "@/services/commande.service";
// import {stat} from "@babel/core/lib/gensync-utils/fs";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

        userCourant: {
            "session_id": null,
            "id_user": null,
            "nom": null,
            "email": null,
            "prenom": null,
            "code_postal": null,
            "adresse": null,
            "commune": null,
            "panier":  [],
            "commandes" : [],
            "id_role": null,
        },

        creneau: [],

        users : [],
        roles : [],
        typeZone: [],
        zones: [],
        areas : [],
        stands: [],
        prestations: [],
        typePresations: [],

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
        getAllZone: state => state.zones,
        getAllUsers : state => state.users,
        getAllRoles : state => state.roles,
        getAllTypeZone: state => state.typeZone,
        getAllArea: state=> state.areas,
        getAllStand: state => state.stands,
        getAllTypePrestation: state => state.typePresations,
        getAllPrestation: state => state.prestations,


        getIdUserCourant: state => state.userCourant.id_user,
        getAllCreneau: state => state.creneau,
        getProvenance : state => state.provenance,
        getCurrentUser: state => state.userCourant,
        getPanierUserCourant : state => state.userCourant.panier,
        getCommandeUserCourant: state => {
            console.log("getCommandeUserCourant:", state.userCourant.commandes);
            return state.userCourant.commandes;
        },

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

        SET_USERS(state, users) {
            state.users.splice(0)
            users.forEach(p => state.users.push(p))
        },

        SET_ROLES(state, roles) {
          state.roles = roles;
        },

        SET_ZONES(state, zones) {
            state.zones.splice(0)
            zones.forEach(p => state.zones.push(p))
        },

        SET_AREAS(state, areas) {
            state.areas.splice(0)
            areas.forEach(p => state.areas.push(p))
        },

        UPDATE_AREA(state, data) {
            const area = state.areas.find(area => area.id_emplacement === data.id);
            if (area) {
                area.id_zone = data.body.id_zone;
            }
        },

        DELETE_AREA(state, id) {
            state.areas = state.areas.filter(item => item.id_emplacement !== id);
        },

        CREATE_AREA(state, payload) {
            state.areas.push(payload);
        },

        SET_TYPE_ZONE(state, typeZone) {
          state.typeZone = typeZone;
        },

        SET_STANDS(state, stands) {
            state.stands = stands;
        },

        SET_TYPE_PRESTATIONS(state, typePresations) {
            state.typePresations = typePresations;
        },

        SET_PRESTATIONS(state, prestations) {
            state.prestations = prestations;
        },


        SET_PROVENANCE(state, provenance) {
            state.provenance = provenance;
        },

        SET_CURRENT_USER(state, users) {
            state.userCourant = users;
        },

        SET_PANIER_USER_COURANT(state, panier) {
            state.userCourant.panier = panier;
        },

        DELETE_PRESTATION_FROM_PANIER_USER_COURANT(state, payload) {
            //console.log("DELETE_PRESTATION_FROM_PANIER_USER_COURANT " + payload.id_prestation + " " + payload.id_creneau);
            //console.log(state.userCourant.panier)
            state.userCourant.panier = state.userCourant.panier.filter(item =>
                !(item.id_prestation === payload.id_prestation && item.id_creneau === payload.id_creneau));
            //console.log(state.userCourant.panier)
        },

        DELETE_ZONE(state, id) {
            state.zones = state.zones.filter(item => item.id_zone !== id);
        },

        UPDATE_ZONE(state, payload) {
            state.zones = state.zones.map(item => {
                if (item.id_zone === payload.id) {
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },

         UPDATE_PRESTATION_QUANTITY_IN_PANIER(state, { id_user, id_prestation, quantite, id_creneau }) {
            console.log("nouvelleQuantite " + quantite);
            state.userCourant.panier = state.userCourant.panier.map(item => {
                if (item.id_user === id_user && item.id_prestation === Number(id_prestation) && item.id_creneau === id_creneau) {
                    console.log("quantite " + item.quantite);
                    console.log("nouvelleQuantite " + quantite);
                    return { ...item, quantite: quantite };
                }
                console.log("UPDATE_PRESTATION_QUANTITY_IN_PANIER " + item.id_user + " presta " + item.id_prestation + " creneau " + item.id_creneau + " quantité " + item.quantite);
                return item;
            });
        },

        CREATE_ZONE(state, payload) {
            state.zones.push(payload);
        },

        ADD_PRESTATION_TO_PANIER_USER_COURANT(state, id_user, id_prestation, quantite, id_creneau) {
            state.userCourant.panier.push({"id_user" : id_user, "id_prestation" : id_prestation, "quantite" : quantite, "id_creneau": id_creneau});
        },

        SET_COMMANDES_USER_COURANT(state, commandes) {
            console.log("commande reçue dans le set bah oui" + commandes)
            console.log("la state : " + this.state.userCourant.commandes)
            state.userCourant.commandes = commandes;
            console.log("la state : " + this.state.userCourant.commandes)
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
        },

        SET_ALL_CRENEAU(state, creneau){
            state.creneau = creneau;
        },

        CREATE_USER(state, payload) {
            state.users.push(payload);
        },

        CREATE_ROLE(state, payload) {
            state.roles.push(payload);
        },

        DELETE_USER(state, id) {
            state.users = state.users.filter(item => item.id_user !== id);
        },

        DELETE_ROLE(state, id) {
            state.roles = state.roles.filter(item => item.id_role !== id);
        },

        UPDATE_USER(state, payload) {
            state.users = state.users.map(item => {
                if (item.id_user === payload.id) {
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },

        UPDATE_ROLE(state, payload) {
            state.roles = state.roles.map(item => {
                if (item.id_role === payload.id) {
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },

    },

    actions: {

        async getCommandeUserCourantStore({commit},user_id){
            try {
                const commandes = await getCommandeUserCourant(user_id);
                commit('SET_COMMANDES_USER_COURANT', commandes);
                console.log("commande envoyée au store" + JSON.stringify(commandes))
            } catch (error) {
                console.error('Error fetching commandes:', error);
            }
        },

        async getPanierUserCourantStore({commit},user_id){
            try {
                const panier = await getPanierUserCourant(user_id);
                commit('SET_PANIER_USER_COURANT', panier);
                console.log("le panier dans le store : " + panier)
            } catch (error) {
                console.error('Error fetching panier:', error);
            }
        },


        async updateQuantityInPanierStore({commit}, {id_user, id_prestation, id_creneau , quantite}) {
            try {
                await updateQuantityInPanier({id_user, id_prestation, id_creneau , quantite});
                commit('UPDATE_PRESTATION_QUANTITY_IN_PANIER', {id_user, id_prestation, id_creneau , quantite});
            }
            catch (error) {
                console.error('Error updating panier:', error);
            }
        },

        async addPrestationToPanierUserCourantStore({commit},{id_user, id_prestation, quantite, id_creneau}){
            try {
                await addPrestationToPanierUser({id_user, id_prestation, quantite, id_creneau});
                commit('ADD_PRESTATION_TO_PANIER_USER_COURANT', id_user, id_prestation, quantite, id_creneau);
            } catch (error) {
                console.error('Error fetching panier:', error);
            }
        },

        async getCreneauStore({ commit }){
            try {
                const creneau = await getAllCreneaux();
                commit('SET_ALL_CRENEAU', creneau);
            } catch (error) {
                console.error('Error fetching creneau:', error);
            }
        },

        async deletePrestationFromPanierUserCourantStore({ commit },{id_user, id_prestation, id_creneau}){
            try {
                console.log("deletePrestationFromPanierUserCourantStore " + id_user + " " + id_prestation + " " + id_creneau);
                await deletePrestationFromPanierUser( id_user, id_prestation, id_creneau);
                commit('DELETE_PRESTATION_FROM_PANIER_USER_COURANT', {id_prestation, id_creneau,});
            } catch (error) {
                console.error('Error fetching panier:', error);
            }
        },




        async getUsers(data,session_id) {
            try {
                const users = await getAllUsers(session_id);
                return users; // Return the fetched data
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },


        async getUsersStore({ commit }) {
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


        async getRoles(data,session_id){
            try {
                //console.log("getting roles..."+session_id)
                const roles = await getAllRoles(session_id);
                return roles; // Return the fetched data
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        },

        async deleteRoleStore({ commit }, id) {
            try {
                await deleteRole(id);
                commit('DELETE_ROLE', id);
            } catch (err) {
                console.error("Error in deleteRoleStore():", err);
            }
        },

        async updateRoleStore({ commit }, id, body) {
            try {
                await updateRole(id, body);
                commit('UPDATE_ROLE', id, body);
            } catch (err) {
                console.error("Error in updateRoleStore():", err);
            }
        },
        

        async createRoleStore({ commit }, body) {
            try {
                console.log("createRoleStore: ", body)
                await createRole(body);
                commit('CREATE_ROLE', body);
            } catch (err) {
                console.error("Error in createRoleStore():", err);
            }
        },

        async createUserStore({ commit }, body) {
            try {
                const user = body.user;
                const session_id = body.session_id;
                await createUser(user,session_id);
                commit('CREATE_USER', body);
            } catch (err) {
                console.error("Error in createUserStore():", err);
            }
        },

        async updateUserStore({ commit }, {id, body}) {
            try {
                await updateUser(id, body);
                commit('UPDATE_USER', id, body);
            } catch (err) {
                console.error("Error in updateUserStore():", err);
            }
        },

        async deleteUserStore({ commit }, id) {
            try {
                await deleteUser(id);
                commit('DELETE_USER', id);
            } catch (err) {
                console.error("Error in deleteUserStore():", err);
            }
        },

        async getRolesStore({ commit }) {
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


        async getTypesZone(){
            try {
                const typeZone = await getAllTypeZones();
                return typeZone; // Return the fetched data
            } catch (error) {
                console.error('Error fetching typeZone:', error);
            }
        },


        async getTypeZonesStore({ commit }) {
          try {
            const typeZone = await getAllTypeZones();
            if (Array.isArray(typeZone)) {
              commit('SET_TYPE_ZONE', typeZone);
            } else {
              console.error("Unexpected response format:", typeZone);
            }
          } catch (err) {
            console.error("Error in getTypeZone():", err);
          }
        },


        async getZones(){
            try {
                const zones = await getAllZones();
                return zones; // Return the fetched data
            } catch (error) {
                console.error('Error fetching zones:', error);
            }
        },


        async getZonesStore({ commit }) {
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

        async deleteZoneStore({ commit }, id) {
            try {
                await deleteZone(id);
                commit('DELETE_ZONE', id);
            } catch (err) {
                console.error("Error in deleteZoneStore():", err);
            }
        },

        async updateZoneStore({ commit }, {id, body}) {  // A REVOIR
            try {
                await updateZone(id, body);
                commit('UPDATE_ZONE', id, body);
            } catch (err) {
                console.error("Error in updateZoneStore():", err);
            }
        },

        async createZoneStore({ commit }, body) {
            try {
                console.log("createZoneStore: ", body)
                await createZone(body);
                commit('CREATE_ZONE', body);
            } catch (err) {
                console.error("Error in createZoneStore():", err);
            }
        },

        async getAreas(){
            try {
                const areas = await getAllAreas();
                return areas; // Return the fetched data
            } catch (error) {
                console.error('Error fetching areas:', error);
            }
        },


        async getAreasStore({ commit }) {
          try {
              const result = await getAllAreas();
              if (Array.isArray(result)) {
                  commit('SET_AREAS', result);
              } else {
                  console.error("Unexpected response format:", result);
              }
          } catch (err) {
              console.error("Error in getAreasStore():", err);
          }
        },

        async updateAreasStore({ commit },{id, body}) {
            try {
                await updateArea(id, body);
                console.log("updateAreasStore: ", id, body)
                commit('UPDATE_AREA', {id, body});
            } catch (err) {
                console.error("Error in updateZoneStore():", err);
            }
        },

        async deleteAreasStore({ commit }, id) {
            try {
                await deleteArea(id);
                commit('DELETE_AREA', id);
            } catch (err) {
                console.error("Error in deleteZoneStore():", err);
            }
        },

        async createAreasStore({ commit }, body) {
            try {
                await createArea(body);
                commit('CREATE_AREA', body);
            } catch (err) {
                console.error("Error in createZoneStore():", err);
            }
        },


        async getStands(){
            try {
                const stands = await getAllStands();
                return stands; // Return the fetched data
            } catch (error) {
                console.error('Error fetching stands:', error);
            }
        },


        async getStandsStore({ commit }) {
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


        async getTypePrestations(){
            try {
                const typePresations = await getAllTypePrestations();
                return typePresations; // Return the fetched data
            } catch (error) {
                console.error('Error fetching typePresations:', error);
            }
        },


        async getTypePrestationsStore({ commit }) {
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


        async getPrestations(){
            try {
                const prestations = await getAllPrestations();
                return prestations; // Return the fetched data
            } catch (error) {
                console.error('Error fetching prestations:', error);
            }
        },


        async getPrestationsStore({ commit }) {
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

    },
    modules: {
        //autres modules si nécessaire
    }
})
