// ══════════════════════════════════════════════════════════════════════════════
// src/services/api.js  — Axios instance with JWT interceptors
// ══════════════════════════════════════════════════════════════════════════════
import axios from 'axios'

const api = axios.create({
  baseURL: '/api/corporate',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

api.interceptors.request.use(cfg => {
  const token = sessionStorage.getItem('corp_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

api.interceptors.response.use(
  res => res.data,
  async err => {
    const orig = err.config
    if (err.response?.status === 401 && !orig._retry) {
      orig._retry = true
      try {
        const rt = sessionStorage.getItem('corp_refresh')
        if (!rt) throw new Error('No refresh token')
        const { token } = await axios.post('/api/corporate/auth/refresh', { refreshToken: rt }).then(r => r.data)
        sessionStorage.setItem('corp_token', token)
        orig.headers.Authorization = `Bearer ${token}`
        return api(orig)
      } catch {
        sessionStorage.clear()
        window.location.href = '/corp-admin/login'
      }
    }
    return Promise.reject(err.response?.data || err)
  }
)

export default api
