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

        async getConversationsAdminStore({commit}){
            try {
                const result = await getAllConversations();
                if (Array.isArray(result)) {
                    commit('SET_CONVERSATIONS', result);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getConversations():", err);
            }
        },
        async getConversationsUserStore({commit}){
            try {
                const result = await getConversationsForUser();
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
