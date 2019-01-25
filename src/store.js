import Vue from 'vue';
import Vuex from 'vuex';
import { SpotifyService } from '@/services/spotify';

Vue.use(Vuex);

export const stateKey = {
  auth: 'auth',
  tracks: 'tracks',
  searchTracks: 'searchTracks',
  playlists: 'playlists',
  selectedPlaylist: 'selectedPlaylist',
  currentPlayback: 'currentPlayback',
};

export const mutationType = {
  setAuth: 'setAuth',
  setTracks: 'setTracks',
  setSearchTracks: 'setSearchTracks',
  setPlaylists: 'setPlaylists',
  setSelectedPlaylist: 'setSelectedPlaylist',
  setCurrentPlayback: 'setCurrentPlayback',

  clearAuth: 'clearAuth',
  clearTracks: 'clearTracks',
  clearSearchTracks: 'clearSearchTracks',
  clearPlaylists: 'clearPlaylists',
  clearSelectedPlaylist: 'clearSelectedPlaylist',
  clearCurrentPlayback: 'clearCurrentPlayback',
};

export const actionType = {
  setAuth: 'setAuth',
  setTracks: 'setTracks',
  setSearchTracks: 'setSearchTracks',
  setPlaylists: 'setPlaylists',
  setSelectedPlaylist: 'setSelectedPlaylist',
  setCurrentPlayback: 'setCurrentPlayback',

  clearAuth: 'clearAuth',
  clearTracks: 'clearTracks',
  clearPlaylists: 'clearPlaylists',
  clearSelectedPlaylist: 'clearSelectedPlaylist',
  clearCurrentPlayback: 'clearCurrentPlayback',

  loadTracks: 'loadTracks',
  loadSearchTracks: 'loadSearchTracks',
  loadPlaylists: 'loadPlaylists',
  loadCurrentPlayback: 'loadCurrentPlayback',
};

export default new Vuex.Store({
  state: {
    [stateKey.auth]: {
      accessToken: undefined,
      expiresIn: -1,
    },
    [stateKey.tracks]: [],
    [stateKey.searchTracks]: [],
    [stateKey.playlists]: [],
    [stateKey.selectedPlaylist]: {},
    [stateKey.currentPlayback]: {},
  },
  mutations: {
    [mutationType.setAuth]: (state, auth) => (state.auth = auth),
    [mutationType.setTracks]: (state, tracks) => (state.tracks = tracks),
    [mutationType.setSearchTracks]: (state, searchTracks) =>
      (state.searchTracks = searchTracks),
    [mutationType.setPlaylists]: (state, playlists) =>
      (state.playlists = playlists),
    [mutationType.setSelectedPlaylist]: (state, selectedPlaylist) =>
      (state.selectedPlaylist = selectedPlaylist),
    [mutationType.setCurrentPlayback]: (state, currentPlayback) =>
      (state.currentPlayback = currentPlayback),

    [mutationType.clearAuth]: state =>
      (state.auth = {
        accessToken: undefined,
        expiresIn: -1,
      }),
    [mutationType.clearTracks]: state => (state.tracks = []),
    [mutationType.clearSearchTracks]: state => (state.searchTracks = []),
    [mutationType.clearPlaylists]: state => (state.playlists = []),
    [mutationType.clearSelectedPlaylist]: state =>
      (state.selectedPlaylist = {}),
    [mutationType.clearCurrentPlayback]: state => (state.currentPlayback = {}),
  },
  actions: {
    [actionType.setAuth]: ({ commit }, auth) =>
      commit(mutationType.setAuth, auth),
    [actionType.setTracks]: ({ commit }, tracks) =>
      commit(mutationType.setTracks, tracks),
    [actionType.setSearchTracks]: ({ commit }, searchTracks) =>
      commit(mutationType.setSearchTracks, searchTracks),
    [actionType.setPlaylists]: ({ commit }, playlists) =>
      commit(mutationType.setPlaylists, playlists),
    [actionType.setSelectedPlaylist]({ commit, dispatch }, selectedPlaylist) {
      commit(mutationType.setSelectedPlaylist, selectedPlaylist);
      dispatch(actionType.loadTracks);
      dispatch(actionType.loadCurrentPlayback);
    },
    [actionType.setCurrentPlayback]: ({ commit }, currentPlayback) =>
      commit(mutationType.setCurrentPlayback, currentPlayback),

    [actionType.clearAuth]: ({ commit }) => commit(mutationType.clearAuth),
    [actionType.clearTracks]: ({ commit }) => commit(mutationType.clearTracks),
    [actionType.clearPlaylists]: ({ commit }) =>
      commit(mutationType.clearPlaylists),
    [actionType.clearSelectedPlaylist]: ({ commit }) =>
      commit(mutationType.clearSelectedPlaylist),
    [actionType.clearCurrentPlayback]: ({ commit }) =>
      commit(mutationType.clearCurrentPlayback),

    async [actionType.loadTracks]({ commit, state }) {
      const playlistId = state.selectedPlaylist.id;
      const accessToken = state.auth.accessToken;
      if (accessToken && playlistId) {
        const response = await SpotifyService.tracks(playlistId, accessToken);
        const tracks = response.items.map(item => item.track);
        commit(mutationType.setTracks, tracks);
      }
    },
    async [actionType.loadSearchTracks]({ commit, state }, query) {
      const accessToken = state.auth.accessToken;
      if (accessToken) {
        const { tracks } = await SpotifyService.search(query, accessToken);
        commit(mutationType.setSearchTracks, tracks.items);
      }
    },
    async [actionType.loadPlaylists]({ commit, state }) {
      const accessToken = state.auth.accessToken;
      if (accessToken) {
        const response = await SpotifyService.playlists(accessToken);
        commit(mutationType.setPlaylists, response.items);
      }
    },
    async [actionType.loadCurrentPlayback]({ commit, state }) {
      const accessToken = state.auth.accessToken;
      if (accessToken) {
        const response = await SpotifyService.playback(accessToken);
        commit(mutationType.setCurrentPlayback, response);
      }
    },
  },
});
