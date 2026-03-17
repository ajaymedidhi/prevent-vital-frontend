// ══════════════════════════════════════════════════════════════════════════════
// src/services/api.js  — Axios instance with JWT interceptors
// ══════════════════════════════════════════════════════════════════════════════
import axios from 'axios'

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || '') + '/api/corporate',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

api.interceptors.request.use(cfg => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token')
  console.log('[DEBUG] Interceptor Request - Token from storage:', token ? token.substring(0, 10) + '...' : 'NULL');
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

api.interceptors.response.use(
  res => res.data,
  async err => {
    const orig = err.config
    if (err.response?.status === 401 && !orig._retry) {
      orig._retry = true
      // No refresh token implementation exists in the current system. Log out if 401.
      sessionStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(err.response?.data || err)
  }
)

export default api
