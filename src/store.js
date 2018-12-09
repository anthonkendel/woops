import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      accessToken: undefined,
      expiresIn: -1,
    },
  },
  mutations: {
    setAuth: (state, auth) => (state.auth = { ...state.auth, ...auth }),
  },
  actions: {
    setAuth: ({ commit }, auth) => commit('setAuth', auth),
  },
});
