import {getAllDescription, updateDescriptionHomePage} from "@/services/homePage.service";

export default {
    namespaced: true,
    state: {
        texts_home: [],
    },
    getters: {
        getTextsHome: state => state.texts_home,
    },
    mutations: {
        SET_TEXTS_HOME(state, texts_home) {
            state.texts_home = texts_home;
        },

        UPDATE_HomePage(state, payload) {
            state.texts_home = state.texts_home.map(item => {
                if (item.id_text_accueil === payload.id_text_accueil) {
                    console.log("item.id_text_accueil " + item.id_text_accueil + " payload.id_text_accueil " + payload.id_text_accueil);
                    return { ...item, ...payload.body };
                }
                return item;
            });
        },

    },
    actions: {
        async updateDescriptionHomePageStore({ commit }, {id_text_accueil, body}) {
            try {
                const session_id = this.state.userCourant.session_id
                await updateDescriptionHomePage(id_text_accueil, body, session_id);
                commit('UPDATE_HomePage', {id_text_accueil, body});
            } catch (err) {
                console.error("Error in updateHomePageStore():", err);
            }
        },

        async getTextsHomeStore({ commit }) {
            try {
                const result = await getAllDescription();
                if (Array.isArray(result)) {
                    commit('SET_TEXTS_HOME', result);
                } else {
                    console.error("Unexpected response format:", result);
                }
            } catch (err) {
                console.error("Error in getTextsHome():", err);
            }
        },
    },

};