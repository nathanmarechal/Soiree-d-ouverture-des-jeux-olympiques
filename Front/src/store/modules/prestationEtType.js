import {
    createPrestation,
    deletePrestation, getAllPrestations,
    getAllTypePrestations, updateIsAvailablePrestation,
    updatePrestation
} from "@/services/prestation.service";

export default {
    namespaced: true,
    state: {
        prestations: [],
        typePresations: [],
        selectedTypePrestation: [],
    },
    getters: {
        getAllTypePrestation: state => state.typePresations,
        getAllPrestation: state => state.prestations,
        getSelectedTypePrestation: state => state.selectedTypePrestation
    },
    mutations: {
        CREATE_PRESTATION(state, payload) {
            state.prestations.push(payload);
        },

        SET_TYPE_PRESTATIONS(state, typePresations) {
            state.typePresations = typePresations;
        },


        SET_PRESTATIONS(state, prestations) {
            state.prestations = prestations;
        },

        SET_SELECTED_TYPE_PRESTATION(state, type) {
            state.selectedTypePrestation = type;
        },

        DELETE_PRESTATION(state, id) {
            state.prestations = state.prestations.filter(item => item.id_prestation !== id);
        },

        UPDATE_PRESTATION(state, payload) {
            state.prestations = state.prestations.map(item => {
                if (item.id_prestation === payload.id) {
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },


    },
    actions: {
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

        async updateIsAvailablePrestationStore({ rootState, commit }, body) {
            try {
                await updateIsAvailablePrestation(body.id, body, rootState.user.userCourant.session_id);
                commit('UPDATE_PRESTATION', body.id, body);
            } catch (err) {
                console.error("Error in updatePrestationIsAvailableRoleStore():", err);
            }
        },

        async updatePrestationStore({rootState,  commit }, body) {
            try {
                await updatePrestation(body.id_prestation, body, rootState.user.userCourant.session_id)
                commit('UPDATE_PRESTATION', body.id_prestation, body);
            } catch (err) {
                console.error("Error in updatePrestationIsAvailableRoleStore():", err);
            }
        },

        async deletePrestationStore({ rootState, commit }, id) {
            try {
                const session_id = rootState.user.userCourant.session_id
                await deletePrestation(id, session_id);
                commit('DELETE_PRESTATION', id);
            } catch (err) {
                console.error("Error in deleteUserStore():", err);
            }
        },

        async createPrestationStore({ rootState, commit }, body) {
            try {
                const session_id = rootState.user.userCourant.session_id
                let response = await createPrestation(body, session_id);
                commit('CREATE_PRESTATION', response[0]);
            } catch (err) {
                console.error("Error in createPrestationStore():", err);
            }
        },

//-----------------------------------------------------------------TypePrestation-----------------------------------------------------------------------//

        async getTypePrestationsStore({ commit }) {
            try {
                const result = await getAllTypePrestations();
                if (Array.isArray(result)) {
                    commit('SET_TYPE_PRESTATIONS', result);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getTypePrestationsStore():", err);
            }
        },
    },

};