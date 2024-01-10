import {getTypeEmplacementLogistique} from "@/services/typeEmplacementLogistique.service";
import {
    createEmplacementLogistique, deleteEmplacementLogistique,
    getEmplacementLogistique,
    updateEmplacementLogistique
} from "@/services/emplacementLogistique.service";

export default {
    namespaced: true,
    state: {
        typeEmplacementLogistique: [],
        emplacementLogistique: [],
        logisticsRequirements: [],
    },
    getters: {
        getAllTypeEmplacementLogistique: state => state.typeEmplacementLogistique,
        getAllEmplacementLogistique: state => state.emplacementLogistique,
        getLogisticsRequirements: state => state.logisticsRequirements,
    },
    mutations: {
        SET_LOGISTICS_REQUIREMENTS(state, requirements) {
            state.logisticsRequirements = requirements;
        },
        SET_TYPE_EMPLACEMENT_LOGISITIQUE(state, typeEmplacementLogistique) {
            state.typeEmplacementLogistique = typeEmplacementLogistique;
        },
        SET_EMPLACEMENT_LOGISITIQUE(state, emplacementLogistique) {
            state.emplacementLogistique = emplacementLogistique;
        },
        CREATE_EMPLACEMENT_LOGISITIQUE(state, payload) {
            state.emplacementLogistique.push(payload);
        },
        UPDATE_EMPLACEMENT_LOGISITIQUE(state, payload) {
            state.emplacementLogistique = state.emplacementLogistique.map(item => {
                if (item.id_emplacement_logistique === payload.id) {
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },


        DELETE_EMPLACEMENT_LOGISITIQUE(state, id) {
            state.emplacementLogistique = state.emplacementLogistique.filter(item => item.id_emplacement_logistique !== id);
        },


    },
    actions: {
        async getTypeEmplacementLogistiqueStore({ commit }) {
            try {
                const typeEmplacementLogistique = await getTypeEmplacementLogistique();
                if (Array.isArray(typeEmplacementLogistique)) {
                    commit('SET_TYPE_EMPLACEMENT_LOGISITIQUE', typeEmplacementLogistique);
                } else {
                    console.error("Unexpected response format:", typeEmplacementLogistique);
                }
            } catch (err) {
                console.error("Error in getTypeZone():", err);
            }
        },
//----------------------------------------------------------------------EmplacementLogistique--------------------------------------------------------------------//

        async getEmplacementLogistiqueStore({ commit }) {
            try {
                const emplacementLogistique = await getEmplacementLogistique();
                if (Array.isArray(emplacementLogistique)) {
                    commit('SET_EMPLACEMENT_LOGISITIQUE', emplacementLogistique);
                } else {
                    console.error("Unexpected response format:", emplacementLogistique);
                }
            } catch (err) {
                console.error("Error in getEmplacementLogistiqueStore():", err);
            }
        },

        async createEmplacementLogistiqueStore({ commit }, body) {
            try {
                let response =  await createEmplacementLogistique(body);
                commit('CREATE_EMPLACEMENT_LOGISITIQUE', response[0]);
            } catch (err) {
                console.error("Error in createEmplacementLogistiqueStore():", err);
            }
        },

        async updateEmplacementLogistiqueStore({ commit }, {id,body}) {
            try {
                console.log(id)
                console.log(body)
                let response = await updateEmplacementLogistique(id, body)

                console.log(response[0])
                commit('UPDATE_EMPLACEMENT_LOGISITIQUE',{id: id, body: response[0]});
            } catch (err) {
                console.error("Error in updateEmplacementLogistiqueStore():", err);
            }
        },

        async deleteEmplacementLogistiqueStore({ commit }, id) {
            try {

                await deleteEmplacementLogistique(id);
                await commit('DELETE_EMPLACEMENT_LOGISITIQUE', id);
            } catch (err) {
                console.error("Error in deleteUserStore():", err);
            }
        },
    },

};