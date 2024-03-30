import {deleteStand, getAllStands, updateDescriptionStand, updateStand, createStand} from "@/services/stand.service";
import {getAllStandAttente} from "@/services/utilisateur.service";

export default {
    namespaced: true,
    state: {
        stands: [],
        selectedStands: [],
        standAttente: null,
    },
    getters: {
        getAllStand: state => state.stands,
        getSelectedStands : state => state.selectedStands,
    },
    mutations: {
        SET_STANDS(state, stands) {
            state.stands = stands;
        },


        UPDATE_STAND(state, payload) {
            state.stands = state.stands.map(item => {
                if (item.id_stand === payload.id) {
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },

        DELETE_STAND(state, id) {
            state.stands = state.stands.filter(item => item.id_stand !== id);
        },

        SET_SELECTED_STANDS(state, stands) {
            state.selectedStands = stands;
        },
        ADD_TO_STANDS(state, data) {
            state.stands.push(data);
        },
        CREATE_STAND(state, stand) {
            state.stands.push(stand);
        },

        SET_STANDS_ATTENTE(state, standAttente) {
            state.standAttente = standAttente;
        }


    },
    actions: {
        async createStandStore({ commit }, body) {
            try {
                const data = await createStand(body);
                commit('CREATE_STAND', data[0]);
            } catch (err) {
                console.error("Error in createStandStore():", err);
            }
        },
        async updateStandStore({ commit }, {id, body}) {
            try {
                await updateStand(id, body);
                commit('UPDATE_STAND', id, body);
            } catch (err) {
                console.error("Error in updateStandStore():", err);
            }
        },

        async updateDescriptionStandStore({ commit }, {id, body}) {
            try {
                await updateDescriptionStand(body, );
                commit('UPDATE_STAND', {id, body});
            } catch (err) {
                console.error("Error in updateStandStore():", err);
            }
        },

        async deleteStandStore({ commit }, id) {
            try {
                await deleteStand(id, );
                commit('DELETE_STAND', id);
            } catch (err) {
                console.error("Error in deleteStandStore():", err);
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

        async getAllStandAttenteStore({ commit }) {
            try {
                const standAttente = await getAllStandAttente();
                commit('SET_STANDS_ATTENTE', standAttente);
            } catch (error) {
                console.error('Error fetching creneau:', error);
            }
        },

        addToStands({ commit }, data) {
            commit('ADD_TO_STANDS', data);
        },
    },

};