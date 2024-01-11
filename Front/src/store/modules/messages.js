import {getAllConversations, getConversationsForUser} from "@/services/messagerie.service";

export default {
    namespaced: true,

    state:{
        conversations: [],
    },
    getters:{
        getConversations : state => state.conversations,
    },

    mutations:{
        SET_CONVERSATIONS(state,conversations){
            state.conversations = conversations;
        },
    },

    actions:{
        //-----------------------------------------------------------------------Messagerie--------------------------------------------------------------------//

        async getConversationsAdminStore({rootState, commit}){
            try {
                let session_id = rootState.user.userCourant.session_id
                const result = await getAllConversations(session_id);
                if (Array.isArray(result)) {
                    commit('SET_CONVERSATIONS', result);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getConversations():", err);
            }
        },
        async getConversationsUserStore({rootState, commit}){
            try {
                const result = await getConversationsForUser(rootState.user.userCourant.id_user,rootState.user.userCourant.session_id);
                if (Array.isArray(result)) {
                    commit('SET_CONVERSATIONS', result);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getConversations():", err);
            }
        }
    }
}
