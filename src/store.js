import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const stateKey = {
  auth: 'auth',
};

export const mutationType = {
  setAuth: 'setAuth',
};

export const actionType = {
  setAuth: 'setAuth',
};

export default new Vuex.Store({
  state: {
    [stateKey.auth]: {
      accessToken: undefined,
      expiresIn: -1,
    },
  },
  mutations: {
    [mutationType.setAuth]: (state, auth) =>
      (state.auth = { ...state.auth, ...auth }),
  },
  actions: {
    [actionType.setAuth]: ({ commit }, auth) => commit('setAuth', auth),
  },
});
