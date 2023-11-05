import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoginOpen: false,
    isUserConnected: false,
    email: '',
    password: '',
  },
  getters: {
    isLoginOpen: state => state.isLoginOpen,
    isUserConnected: state => state.isUserConnected,
    email: state => state.email,
    password: state => state.password,
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
  },
  actions: {
  },
  modules: {
  }
})
