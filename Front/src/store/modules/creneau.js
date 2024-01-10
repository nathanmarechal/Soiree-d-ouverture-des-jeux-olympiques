import {getAllCreneaux} from "@/services/panier.service";

export default {
    state: {
        creneau: [],
    },
    getters: {
        getAllCreneau: state => state.creneau,
    },
    mutations: {
        SET_ALL_CRENEAU(state, creneau){
            state.creneau = creneau;
        },    },
    actions: {
        async getCreneauStore({ commit }){
            try {
                const creneau = await getAllCreneaux();
                commit('SET_ALL_CRENEAU', creneau);
            } catch (error) {
                console.error('Error fetching creneau:', error);
            }
        },
    },
};