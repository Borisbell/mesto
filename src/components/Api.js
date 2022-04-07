class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
      name,
      about
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '02c148a3-ef23-4baa-b389-8cb95ba5fa76',
    'Content-Type': 'application/json'
  }
});