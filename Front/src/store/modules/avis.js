import {deleteAvis, getAvisByIdStand, uploadAvis} from "@/services/avis.service";

export default {
    namespaced: true,
    state: {
        avis : null,
    },
    getters: {
        getAvis : state => state.avis,
    },
    mutations: {
        SET_AVIS(state, avis) {
            state.avis = avis;
        },


        ADD_AVIS(state, avis) {
            console.log("ADD_AVIS " + avis);
        },


        DELETE_AVIS(state, id) {
            state.avis = state.avis.filter(item => item.id_avis_stand_utilisateur !== id);
        },
    },
    actions: {
        async getAvisStore({ commit }, id_stand) {
            try {
                const avis = await getAvisByIdStand(id_stand);
                commit('SET_AVIS', avis);
            } catch (error) {
                console.error('Error fetching avis:', error);
            }
        },

        async uploadAvisStore({rootState, commit }, {id_stand, id_user, note, commentaire}) {
            try {
                const avis = await uploadAvis({id_stand, id_user, note, commentaire},rootState.user.userCourant.session_id);
                commit('ADD_AVIS', avis);
            } catch (error) {
                console.error('Error fetching avis:', error);
            }
        },

        async deleteAvisStore({ rootState, commit }, id) {
            try {
                await deleteAvis(id, rootState.user.userCourant.session_id);
                commit('DELETE_AVIS', id);
            } catch (error) {
                console.error('Error fetching avis:', error);
            }
        },
    },

};