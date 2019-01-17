export function request({ url, method = 'GET', headers = {}, body = {} }) {
  const options = {
    method,
    headers,
  };
  if (method === 'PUT' || method === 'POST') {
    options.body = JSON.stringify(body);
    options.headers['Content-Type'] = 'application/json; charset=utf-8';
  }
  return fetch(url, options)
    .then(value => value.json())
    .then(json => json)
    .catch(() => ({}));
}
