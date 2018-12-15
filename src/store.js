import Vue from 'vue';
import Vuex from 'vuex';
import { SpotifyService } from '@/services/spotify';

Vue.use(Vuex);

export const stateKey = {
  auth: 'auth',

  playlists: 'playlists',
  selectedPlaylist: 'selectedPlaylist',
};

export const mutationType = {
  setAuth: 'setAuth',

  setPlaylists: 'setPlaylists',
  setSelectedPlaylist: 'setSelectedPlaylist',
};

export const actionType = {
  setAuth: 'setAuth',

  setPlaylists: 'setPlaylists',
  setSelectedPlaylist: 'setSelectedPlaylist',
  loadPlaylists: 'loadPlaylists',
};

export default new Vuex.Store({
  state: {
    [stateKey.auth]: {
      accessToken: undefined,
      expiresIn: -1,
    },

    [stateKey.playlists]: [],
    [stateKey.selectedPlaylist]: undefined,
  },
  mutations: {
    [mutationType.setAuth]: (state, auth) => (state.auth = auth),

    [mutationType.setPlaylists]: (state, playlists) =>
      (state.playlists = playlists),
    [mutationType.setSelectedPlaylist]: (state, selectedPlaylist) =>
      (state.selectedPlaylist = selectedPlaylist),
  },
  actions: {
    [actionType.setAuth]: ({ commit }, auth) =>
      commit(mutationType.setAuth, auth),

    [actionType.setPlaylists]: ({ commit }, playlists) =>
      commit(mutationType.setPlaylists, playlists),
    [actionType.setSelectedPlaylist]: ({ commit }, selectedPlaylist) =>
      commit(mutationType.setSelectedPlaylist, selectedPlaylist),
    async [actionType.loadPlaylists]({ commit, state }) {
      const accessToken = state.auth.accessToken;
      if (accessToken) {
        const response = await SpotifyService.playlists(accessToken);
        commit(mutationType.setPlaylists, response.items);
      }
    },
  },
});
