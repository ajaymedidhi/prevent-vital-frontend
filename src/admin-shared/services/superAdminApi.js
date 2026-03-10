import axios from 'axios'

const superAdminApi = axios.create({
    baseURL: '/api/super-admin',
    headers: { 'Content-Type': 'application/json' },
    timeout: 15000,
})

superAdminApi.interceptors.request.use(cfg => {
    // Super-admin session uses 'token'; corp-admin uses 'corp_token'
    const token = sessionStorage.getItem('token') || sessionStorage.getItem('corp_token')
    if (token) cfg.headers.Authorization = `Bearer ${token}`
    return cfg
})

superAdminApi.interceptors.response.use(
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
                return superAdminApi(orig)
            } catch {
                sessionStorage.clear()
                window.location.href = '/corp-admin/login'
            }
        }
        return Promise.reject(err.response?.data || err)
    }
)

export default superAdminApi
