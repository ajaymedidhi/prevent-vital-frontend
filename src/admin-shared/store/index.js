import { create } from 'zustand'
import api from '../services/api'

export const useAuthStore = create((set, get) => ({
  admin: null,
  org: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email, password) => {
    const data = await api.post('/auth/login', { email, password })
    sessionStorage.setItem('corp_token', data.token)
    sessionStorage.setItem('corp_refresh', data.refreshToken)
    set({ admin: data.admin, org: data.org, isAuthenticated: true })
    return data
  },

  logout: () => {
    sessionStorage.removeItem('corp_token')
    sessionStorage.removeItem('corp_refresh')
    set({ admin: null, org: null, isAuthenticated: false })
    window.location.href = '/corp-admin/login'
  },

  fetchMe: async () => {
    try {
      const token = sessionStorage.getItem('corp_token')
      if (!token) { set({ isLoading: false }); return }
      const data = await api.get('/auth/me')
      set({ admin: data.admin, org: data.org, isAuthenticated: true, isLoading: false })
    } catch {
      set({ isLoading: false, isAuthenticated: false })
    }
  },

  updateAdmin: (updates) => set(s => ({ admin: { ...s.admin, ...updates } })),
  updateOrg: (updates) => set(s => ({ org: { ...s.org, ...updates } })),
}))

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  notifOpen: false,
  toasts: [],
  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
  toggleNotif: () => set(s => ({ notifOpen: !s.notifOpen })),

  toast: (message, type = 'success', duration = 4000) => {
    const id = Date.now()
    set(s => ({ toasts: [...s.toasts, { id, message, type }] }))
    setTimeout(() => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })), duration)
  },
  removeToast: (id) => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })),
}))
