import { defineStore } from 'pinia'
import { api, setAuthToken } from '../utils/api'


export const useAuthStore = defineStore('auth', {
state: () => ({
token: null,
user: null,
}),
getters: {
isAuthenticated: (state) => !!state.token,
},
actions: {
async login({ username, password }) {
try {
const res = await api.post('/auth/login', { username, password })
this.token = res.data.token
this.user = res.data
setAuthToken(this.token)
localStorage.setItem('auth', JSON.stringify({ token: this.token, user: this.user }))
return true
} catch (err) {
this.token = null
this.user = null
throw err
}
},
logout() {
this.token = null
this.user = null
setAuthToken(null)
localStorage.removeItem('auth')
},
restoreSession() {
const raw = localStorage.getItem('auth')
if (!raw) return
try {
const session = JSON.parse(raw)
this.token = session.token
this.user = session.user
setAuthToken(this.token)
} catch (e) {
console.error('failed to restore session', e)
}
}
}
})