import axios from 'axios';

const adminApi = axios.create({
    baseURL: (import.meta.env.VITE_API_URL || '').replace(/\/$/, '') + '/api/admin',
    headers: { 'Content-Type': 'application/json' },
    timeout: 15000,
});

adminApi.interceptors.request.use(cfg => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});

adminApi.interceptors.response.use(
    res => res.data,
    async err => {
        const orig = err.config;
        if (err.response?.status === 401 && !orig._retry) {
            orig._retry = true;
            sessionStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(err.response?.data || err);
    }
);

// ── 1. Products ──────────────────────────────────────────────────────────────
export const getProducts = (params) => adminApi.get('/products', { params });
export const getProduct = (id) => adminApi.get(`/products/${id}`);
export const createProduct = (data) => adminApi.post('/products', data);
export const updateProduct = (id, data) => adminApi.put(`/products/${id}`, data);
export const deleteProduct = (id) => adminApi.delete(`/products/${id}`);
export const updateProductStatus = (id, status) => adminApi.patch(`/products/${id}/status`, { status });
export const getProductUploadUrl = (productId, uploadParams) => 
    adminApi.post(`/products/${productId}/upload-url`, uploadParams);
export const uploadProductMediaDirect = (productId, file, type, onProgress) => {
    const form = new FormData();
    form.append('file', file);
    form.append('type', type);
    return adminApi.post(`/products/${productId}/upload-direct`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
            if (e.total && onProgress) {
                onProgress(Math.round((e.loaded / e.total) * 100));
            }
        }
    });
};

// ── 2. Inventory ─────────────────────────────────────────────────────────────
export const getInventory = (params) => adminApi.get('/inventory', { params });
export const updateStock = (productId, data) => adminApi.put(`/inventory/${productId}/stock`, data);
export const getInventoryLogs = (params) => adminApi.get('/inventory/logs', { params });

// ── 3. Delivery Locations ────────────────────────────────────────────────────
export const getLocations = (params) => adminApi.get('/locations', { params });
export const createLocation = (data) => adminApi.post('/locations', data);
export const updateLocation = (id, data) => adminApi.put(`/locations/${id}`, data);
export const deleteLocation = (id) => adminApi.delete(`/locations/${id}`);

export default adminApi;
