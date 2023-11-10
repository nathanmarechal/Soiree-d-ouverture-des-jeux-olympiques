import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    isLoginOpen: false,
    isUserConnected: false,
    email: '',
    password: '',
    prestations: [
      {"id_prestation": 1, "libelle": "Prestation 1", "prix": "241.92 €", "id_type_prestation": 2, "id_stand": 8, "creneau_horaire": "2023-11-14 16:00:00", "image": "https://example.com/images/prestation_1.jpg"},
      {"id_prestation": 2, "libelle": "Prestation 2", "prix": "153.07 €", "id_type_prestation": 6, "id_stand": 9, "creneau_horaire": "2023-11-12 15:00:00", "image": "https://example.com/images/prestation_2.jpg"},
      {"id_prestation": 3, "libelle": "Prestation 3", "prix": "250.20 €", "id_type_prestation": 5, "id_stand": 2, "creneau_horaire": "2023-11-17 20:00:00", "image": "https://example.com/images/prestation_3.jpg"},
      {"id_prestation": 4, "libelle": "Prestation 4", "prix": "274.50 €", "id_type_prestation": 3, "id_stand": 2, "creneau_horaire": "2023-11-17 14:00:00", "image": "https://example.com/images/prestation_4.jpg"},
      {"id_prestation": 5, "libelle": "Prestation 5", "prix": "119.02 €", "id_type_prestation": 3, "id_stand": 4, "creneau_horaire": "2023-11-12 16:00:00", "image": "https://example.com/images/prestation_5.jpg"},
      {"id_prestation": 6, "libelle": "Prestation 6", "prix": "395.64 €", "id_type_prestation": 4, "id_stand": 5, "creneau_horaire": "2023-11-14 19:00:00", "image": "https://example.com/images/prestation_6.jpg"},
      {"id_prestation": 7, "libelle": "Prestation 7", "prix": "331.67 €", "id_type_prestation": 4, "id_stand": 2, "creneau_horaire": "2023-11-12 15:00:00", "image": "https://example.com/images/prestation_7.jpg"},
      {"id_prestation": 8, "libelle": "Prestation 8", "prix": "448.16 €", "id_type_prestation": 2, "id_stand": 1, "creneau_horaire": "2023-11-11 12:00:00", "image": "https://example.com/images/prestation_8.jpg"},
      {"id_prestation": 9, "libelle": "Prestation 9", "prix": "215.66 €", "id_type_prestation": 3, "id_stand": 5, "creneau_horaire": "2023-11-20 10:00:00", "image": "https://example.com/images/prestation_9.jpg"},
      {"id_prestation": 10, "libelle": "Prestation 10", "prix": "457.62 €", "id_type_prestation": 2, "id_stand": 1, "creneau_horaire": "2023-11-14 08:00:00", "image": "https://example.com/images/prestation_10.jpg"}
    ]

  },
  getters: {
    isLoginOpen: state => state.isLoginOpen,
    isUserConnected: state => state.isUserConnected,
    email: state => state.email,
    password: state => state.password,
    allPrestations: state => state.prestations  // Getter pour les prestations
  },
  mutations: {
    SET_LOGIN_MODAL(state, value) {
      state.isLoginOpen = value;
    },
    SET_USER_CONNECTED(state, value) {
      state.isUserConnected = value;
    },
    SET_EMAIL(state, value) {
      state.email = value;
    },
    SET_PASSWORD(state, value) {
      state.password = value;
    },
    SET_PRESTATIONS(state, prestations) {  // Mutation pour mettre à jour les prestations
      state.prestations = prestations;
    }
  },
  actions: {
      //fetchPrestations({ commit }) {
      // Logique d'appel à l'API pour récupérer les prestations
      // Par exemple, utiliser axios pour faire une requête GET
      // puis commit('SET_PRESTATIONS', responseData)
     //}
  },
  modules: {
    // autres modules si nécessaire
  }
})