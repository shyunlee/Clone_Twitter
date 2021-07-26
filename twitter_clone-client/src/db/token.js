const TOKEN = 'token'

export default class TokenStorage {
    getToken () {
        return localStorage.getItem(TOKEN)
    }

    saveToken (token) {
        localStorage.setItem(TOKEN, token)
    }

    clearToken () {
        localStorage.clear(TOKEN)
    }
}