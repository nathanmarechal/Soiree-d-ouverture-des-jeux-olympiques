import {createRole, deleteRole, getAllRoles, updateRole} from "@/services/role.service";
import {getAllDroits} from "@/services/droit.service";
import {
    createRoleDroitAssociation,
    deleteRoleDroitAssociation, deleteRoleDroitAssociationForSpecificRole,
    getAllRoleDroitAssociation
} from "@/services/role_droit.service";

export default {
    namespaced: true,
    state: {
        roles : [],
        droits : [],
        roleDroitAssociation : [],    },
    getters: {
        getAllRoles : state => state.roles,
        getAllDroits : state => state.droits,
        getAllRoleDroitAssociation : state => state.roleDroitAssociation,
        //give me the droits that have the same id as the drotis associated to the id_role
        getRoleDroits : (state) => (id_role) => {
            const getThisRoleDroitsAssociation = []
            const getThisRoleDroits = []
            //console.log(state.roleDroitAssociation)
            state.roleDroitAssociation.forEach(item => {
                if (item.id_role === id_role.id_role) {
                    getThisRoleDroitsAssociation.push(item.id_droit)
                }
            })
            // console.log("getThisRoleDroitsAssociation: ", getThisRoleDroitsAssociation)
            // console.log("state.droits: ", state.droits)
            state.droits.forEach(item => {
                //console.log("item.id: ", item.id)
                if (getThisRoleDroitsAssociation.includes(item.id)) {
                    getThisRoleDroits.push(item)
                }
            })
            //console.log("getThisRoleDroits: ", getThisRoleDroits)
            return getThisRoleDroits;
        },
    },
    mutations: {
        SET_ROLES(state, roles) {
            state.roles = roles;
        },


        SET_DROITS(state, droits) {
            state.droits = droits;
        },


        SET_ROLE_DROIT_ASSOCIATION(state, roleDroitAssociation) {
            state.roleDroitAssociation = roleDroitAssociation;
        },


        CREATE_ROLE_DROIT_ASSOCIATION(state, payload) {
            state.roleDroitAssociation.push(payload);
        },


        DELETE_ROLE_DROIT_ASSOCIATION(state, payload) {
            state.roleDroitAssociation = state.roleDroitAssociation.filter(item => item.id_role !== payload.id_droit && item.id_droit !== payload.id_droit);
        },


        DELETE_ROLE_DROIT_ASSOCIATION_FOR_SPECIFIC_ROLE(state, payload) {
            state.roleDroitAssociation = state.roleDroitAssociation.filter(item => item.id_role !== payload.id_role);
        },

        CREATE_ROLE(state, payload) {
            state.roles.push(payload);
        },

        DELETE_ROLE(state, id) {
            state.roles = state.roles.filter(item => item.id_role !== id);
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
//----------------------------------------------------------------------Role--------------------------------------------------------------------//

        async getRolesStore({commit}) {
            try {
                const roles = await getAllRoles();
                console.log("ROLEROLEROLE SANS CROCHET 0: ", roles)
                console.log("ROLEROLEROLE [0]: ", roles[0])
                if (Array.isArray(roles)) {
                    commit('SET_ROLES', roles);
                } else {
                    console.error("Unexpected response format:", roles);
                }
            } catch (err) {
                console.error("Error in getRolesStore():", err);
            }
        },

        async createRoleStore({rootState, commit}, body) {
            try {
                console.log("createRoleStore: ", body)
                const data = await createRole(body, rootState.user.userCourant.session_id);
                console.log("datacreate: ", data);
                console.log("datacreate: ", data[0]);
                commit('CREATE_ROLE', data[0]);
                return data[0];
            } catch (err) {
                console.error("Error in createRoleStore():", err);
            }
        },

        async deleteRoleStore({rootState, commit}, id) {
            try {
                const data = await deleteRole(id, rootState.user.userCourant.session_id);
                //console.log("datadelete: ", data[0].id_role);
                commit('DELETE_ROLE', data[0].id_role);
            } catch (err) {
                console.error("Error in deleteRoleStore():", err);
            }
        },

        async updateRoleStore({rootState, commit}, body) {
            try {
                console.log("updateRoleStore: ", body)
                const data = await updateRole(body, rootState.user.userCourant.session_id);
                console.log("dataupdate: ", data, data[0].id_role);
                commit('UPDATE_ROLE', data[0].id_role);
                console.log("dataupdate2: ", data[0]);
                return data;
            } catch (err) {
                console.error("Error in updateRoleStore():", err);
            }
        },

//-----------------------------------------------------------------Droits-----------------------------------------------------------------------//

        async getDroitsStore({commit}) {
            try {
                const result = await getAllDroits();
                if (Array.isArray(result)) {
                    commit('SET_DROITS', result);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getDroitsStore():", err);
            }
        },

        async getAllRoleDroitAssociationStore({commit}) {
            try {
                const result = await getAllRoleDroitAssociation(); // Wait for the Promise to resolve
                // print what kind of object is result
                //console.log("result: ", result);

                if (Array.isArray(result)) {
                    commit('SET_ROLE_DROIT_ASSOCIATION', result);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getAllRoleDroitAssociationStore():", err);
            }
        },

        async createRoleDroitAssociationStore({rootState , commit}, body) {
            try {
                const data = await createRoleDroitAssociation(body, rootState.user.userCourant.session_id);
                commit('CREATE_ROLE_DROIT_ASSOCIATION', data[0]);
                return data[0];
            } catch (err) {
                console.error("Error in createRoleDroitAssociationStore():", err);
            }
        },

        async deleteRoleDroitAssociationStore({rootState, commit}, body) {
            try {
                //console.log("deleteRoleDroitAssociationStore: ", body)
                const data = await deleteRoleDroitAssociation(body, rootState.user.userCourant.session_id);
                //console.log("datdeletea: ", data[0]);
                commit('DELETE_ROLE_DROIT_ASSOCIATION', data[0]);
            } catch (err) {
                console.error("Error in deleteRoleDroitAssociationStore():", err);
            }
        },

        async deleteRoleDroitAssociationForSpecificRoleStore({rootState, commit}, id_role) {
            try {
                //console.log("deleteRoleDroitAssociationForSpecificRoleStore: ", id_role)
                const data = await deleteRoleDroitAssociationForSpecificRole(id_role, rootState.user.userCourant.session_id);
                //console.log("datdeletea: ", data[0]);
                commit('DELETE_ROLE_DROIT_ASSOCIATION_FOR_SPECIFIC_ROLE', data[0]);
            } catch (err) {
                console.error("Error in deleteRoleDroitAssociationForSpecificRoleStore():", err);
            }
        },
    }
};
