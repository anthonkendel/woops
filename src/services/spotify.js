import { request } from '@/services/request';

const clientId = 'c0374a8b5c4144f0be3ebacfa7974330';
const allScopes = [
  'user-read-currently-playing',
  'user-modify-playback-state',
  'user-read-playback-state',
  'user-read-private',
  'user-read-email',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
];
const scopes = allScopes.join(' ');

export const SpotifyService = {
  authorize() {
    const params = {
      client_id: clientId,
      response_type: 'token',
      redirect_uri: 'http://localhost:9999/',
      state: '',
      scopes: encodeURIComponent(scopes),
      show_dialog: false,
    };
    const query = Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');
    const url = `https://accounts.spotify.com/authorize?${query}`;
    window.location.href = url;
  },

  authFromCallback() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');
    return { accessToken, expiresIn };
  },

  me(accessToken) {
    return request({
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  playlists(accessToken) {
    return request({
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  tracks(playlistId, accessToken) {
    return request({
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  search(query, accessToken) {
    const searchQuery = `q=${query}`;
    const searchTypes = 'type=track';
    const urlSearch = encodeURI(`${searchQuery}&${searchTypes}`);
    return request({
      url: `https://api.spotify.com/v1/search?${urlSearch}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  playback(accessToken) {
    // TODO: Handle 204 NO CONTENT. No content means no player found.
    return request({
      url: 'https://api.spotify.com/v1/me/player',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  play(body, accessToken) {
    return request({
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/play',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });
  },

  pause(accessToken) {
    return request({
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/pause',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};
