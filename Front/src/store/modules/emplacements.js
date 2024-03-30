import {createArea, deleteArea, getAllAreas, updateArea} from "@/services/map.service";

export default {
    namespaced: true,
    state: {
        areas : [],
        areaSelectedForStand: null,

    },
    getters: {
        getAllArea: state=> state.areas,
        getAreaSelectedForStand: state=> state.areaSelectedForStand,

    },
    mutations: {
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

        SET_SELECTED_AREA(state, area){
            state.areaSelectedForStand = area;
        },


    },
    actions: {
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


        async updateAreasStore({commit},{id, body}) {
            try {
                await updateArea(id, body);
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


        async createAreasStore({  commit }, body) {
            try {
                let response =  await createArea(body);
                commit('CREATE_AREA', response[0]);
            } catch (err) {
                console.error("Error in createZoneStore():", err);
            }
        },
    },
}
