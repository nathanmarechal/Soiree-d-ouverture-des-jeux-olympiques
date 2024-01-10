import {deleteStand, getAllStands, updateDescriptionStand, updateStand} from "@/services/stand.service";

export default {
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


    },
    actions: {
        async updateStandStore({ commit }, {id, body}) {
            try {
                console.log(id, body)
                await updateStand(id, body);
                commit('UPDATE_STAND', id, body);
            } catch (err) {
                console.error("Error in updateStandStore():", err);
            }
        },

        async updateDescriptionStandStore({ commit }, {id, body}) {
            try {
                console.log(id, body)
                await updateDescriptionStand(id, body);
                commit('UPDATE_STAND', {id, body});
            } catch (err) {
                console.error("Error in updateStandStore():", err);
            }
        },

        async deleteStandStore({ commit }, id) {
            try {
                await deleteStand(id);
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
    },

};