import {createZone, deleteZone, getAllTypeZones, getAllZones, updateZone} from "@/services/map.service";

export default {
    namespaced: true,
    state: {
        typeZone: [],
        zones: [],
        selectedZone: [],
        selectedTypeZones: [],
    },
    getters: {
        getAllZone: state => state.zones,
        getAllTypeZone: state => state.typeZone,
        getSelectedZone: state => state.selectedZone,
        getSelectedTypeZones: state=> state.selectedTypeZones,
    },
    mutations: {
        SET_ZONES(state, zones) {
            state.zones.splice(0)
            zones.forEach(p => state.zones.push(p))
        },
        SET_TYPE_ZONE(state, typeZone) {
            state.typeZone = typeZone;
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

        CREATE_ZONE(state, payload) {
            state.zones.push(payload);
        },

        SET_SELECTED_ZONE(state, zone) {
            state.selectedZone = zone;
        },

        SET_SELECTED_TYPE_ZONES(state, typeZones) {
            state.selectedTypeZones = typeZones;
        },


    },
    actions: {
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

        async updateZoneStore({ commit }, {id, body}) {
            try {
                await updateZone(id, body);
                commit('UPDATE_ZONE', id, body);
            } catch (err) {
                console.error("Error in updateZoneStore():", err);
            }
        },

        async createZoneStore({ commit }, body) {
            try {
                const newZone = await createZone(body);
                commit('CREATE_ZONE', newZone[0]);
            } catch (err) {
                console.error("Error in createZoneStore():", err);
            }
        },

    },

};