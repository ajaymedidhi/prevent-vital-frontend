import axios from 'axios'

const creatorApi = axios.create({
    baseURL: (import.meta.env.VITE_API_URL || '') + '/api/creator',
    headers: { 'Content-Type': 'application/json' },
    timeout: 15000,
})

creatorApi.interceptors.request.use(cfg => {
    const token = sessionStorage.getItem('token')
    if (token) cfg.headers.Authorization = `Bearer ${token}`
    return cfg
})

creatorApi.interceptors.response.use(
    res => res.data,
    async err => {
        const orig = err.config
        if (err.response?.status === 401 && !orig._retry) {
            orig._retry = true
            // Redirect to login or handle refresh if available
            window.location.href = '/login'
        }
        return Promise.reject(err.response?.data || err)
    }
)

export default creatorApi
