import Vue from 'vue';
import Vuex from 'vuex';
import { SpotifyService } from '@/services/spotify';

Vue.use(Vuex);

export const stateKey = {
  auth: 'auth',
  tracks: 'tracks',
  playlists: 'playlists',
  selectedPlaylist: 'selectedPlaylist',
};

export const mutationType = {
  setAuth: 'setAuth',
  setTracks: 'setTracks',
  setPlaylists: 'setPlaylists',
  setSelectedPlaylist: 'setSelectedPlaylist',

  clearAuth: 'clearAuth',
  clearTracks: 'clearTracks',
  clearPlaylists: 'clearPlaylists',
  clearSelectedPlaylist: 'clearSelectedPlaylist',
};

export const actionType = {
  setAuth: 'setAuth',
  setTracks: 'setTracks',
  setPlaylists: 'setPlaylists',
  setSelectedPlaylist: 'setSelectedPlaylist',

  clearAuth: 'clearAuth',
  clearTracks: 'clearTracks',
  clearPlaylists: 'clearPlaylists',
  clearSelectedPlaylist: 'clearSelectedPlaylist',

  loadTracks: 'loadTracks',
  loadPlaylists: 'loadPlaylists',
};

export default new Vuex.Store({
  state: {
    [stateKey.auth]: {
      accessToken: undefined,
      expiresIn: -1,
    },
    [stateKey.tracks]: [],
    [stateKey.playlists]: [],
    [stateKey.selectedPlaylist]: {},
  },
  mutations: {
    [mutationType.setAuth]: (state, auth) => (state.auth = auth),
    [mutationType.setTracks]: (state, tracks) => (state.tracks = tracks),
    [mutationType.setPlaylists]: (state, playlists) =>
      (state.playlists = playlists),
    [mutationType.setSelectedPlaylist]: (state, selectedPlaylist) =>
      (state.selectedPlaylist = selectedPlaylist),

    [mutationType.clearAuth]: state =>
      (state.auth = {
        accessToken: undefined,
        expiresIn: -1,
      }),
    [mutationType.clearTracks]: state => (state.tracks = []),
    [mutationType.clearPlaylists]: state => (state.playlists = []),
    [mutationType.clearSelectedPlaylist]: state =>
      (state.selectedPlaylist = {}),
  },
  actions: {
    [actionType.setAuth]: ({ commit }, auth) =>
      commit(mutationType.setAuth, auth),
    [actionType.setTracks]: ({ commit }, tracks) =>
      commit(mutationType.setTracks, tracks),
    [actionType.setPlaylists]: ({ commit }, playlists) =>
      commit(mutationType.setPlaylists, playlists),
    [actionType.setSelectedPlaylist]({ commit, dispatch }, selectedPlaylist) {
      commit(mutationType.setSelectedPlaylist, selectedPlaylist);
      dispatch(actionType.loadTracks);
    },

    [actionType.clearAuth]: ({ commit }) => commit(mutationType.clearAuth),
    [actionType.clearTracks]: ({ commit }) => commit(mutationType.clearTracks),
    [actionType.clearPlaylists]: ({ commit }) =>
      commit(mutationType.clearPlaylists),
    [actionType.clearSelectedPlaylist]: ({ commit }) =>
      commit(mutationType.clearSelectedPlaylist),

    async [actionType.loadTracks]({ commit, state }) {
      const playlistId = state.selectedPlaylist.id;
      const accessToken = state.auth.accessToken;
      if (accessToken && playlistId) {
        const response = await SpotifyService.tracks(playlistId, accessToken);
        const tracks = response.items.map(item => item.track);
        commit(mutationType.setTracks, tracks);
      }
    },
    async [actionType.loadPlaylists]({ commit, state }) {
      const accessToken = state.auth.accessToken;
      if (accessToken) {
        const response = await SpotifyService.playlists(accessToken);
        commit(mutationType.setPlaylists, response.items);
      }
    },
  },
});
