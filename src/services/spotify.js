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

function request({ url, method = 'GET', headers = {}, body = {} }) {
  const options = { method, headers };
  if (method === 'PUT' || method === 'POST') {
    options.body = JSON.stringify(body);
    options.headers['Content-Type'] = 'application/json; charset=utf-8';
  }
  return fetch(url, options)
    .then(value => value.json())
    .then(json => json)
    .catch(() => ({}));
}

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

  playback(accessToken) {
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
