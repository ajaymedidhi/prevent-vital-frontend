import axios from 'axios';

const BASE = (import.meta.env.VITE_API_URL || '') + '/api/media';

const token = () =>
    sessionStorage.getItem('token') || localStorage.getItem('token');

const authHeader = () => ({ Authorization: `Bearer ${token()}` });

// ── Request a resumable GCS upload URL (videos) ───────────────────────────────
export const requestUploadUrl = ({ programId, type, fileName, mimeType, size }) =>
    axios.post(
        `${BASE}/upload-url`,
        { programId, type, fileName, mimeType, size },
        { headers: { 'Content-Type': 'application/json', ...authHeader() } }
    );

// ── Confirm a resumable upload ────────────────────────────────────────────────
export const confirmUpload = (mediaId, { videoDuration, thumbnailRef } = {}) =>
    axios.post(
        `${BASE}/${mediaId}/confirm`,
        { videoDuration, thumbnailRef },
        { headers: authHeader() }
    );

// ── Direct upload (image / resource via FormData) ─────────────────────────────
// onProgress: (percent: number) => void
export const directUpload = (file, { type, programId }, onProgress) => {
    const form = new FormData();
    form.append('file', file);
    form.append('type', type);
    if (programId) form.append('programId', programId);

    return axios.post(`${BASE}/upload`, form, {
        headers: { ...authHeader() },
        onUploadProgress: (e) => {
            if (e.total && onProgress) {
                onProgress(Math.round((e.loaded / e.total) * 100));
            }
        }
    });
};

// ── Get a fresh signed streaming URL ─────────────────────────────────────────
export const getSignedUrl = (mediaId) =>
    axios.get(`${BASE}/${mediaId}/signed-url`, { headers: authHeader() });

// ── Get media metadata ────────────────────────────────────────────────────────
export const getMedia = (mediaId) =>
    axios.get(`${BASE}/${mediaId}`, { headers: authHeader() });

// ── Get all media for a program ───────────────────────────────────────────────
export const getProgramMedia = (programId) =>
    axios.get(`${BASE}/program/${programId}`, { headers: authHeader() });

// ── Delete media ──────────────────────────────────────────────────────────────
export const deleteMedia = (mediaId) =>
    axios.delete(`${BASE}/${mediaId}`, { headers: authHeader() });

// ── Proxy video upload (browser → backend → GCS, no bucket CORS required) ────
// onProgress: (percent: number) => void  — tracks the browser→backend leg (0-90%)
export const uploadVideoProxy = (file, { programId } = {}, onProgress, signal) => {
    const form = new FormData();
    form.append('file', file);
    if (programId) form.append('programId', programId);

    const controller = signal ? undefined : new AbortController();
    return axios.post(`${BASE}/upload-video`, form, {
        headers: { ...authHeader() },
        onUploadProgress: (e) => {
            if (e.total && onProgress) {
                onProgress(Math.round((e.loaded / e.total) * 90));
            }
        },
        signal: signal ?? controller?.signal,
        timeout: 60 * 60 * 1000  // 1 hour for large video files
    });
};

// ── Upload a file to a GCS resumable session URI via XHR (progress tracking) ──
// Kept for future use once bucket CORS is configured.
export const uploadToGCS = (file, uploadUrl, onProgress, signal) =>
    new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 95));
        };
        xhr.onload = () => {
            xhr.status >= 200 && xhr.status < 400
                ? resolve()
                : reject(new Error(`GCS upload failed: ${xhr.status} ${xhr.statusText}`));
        };
        xhr.onerror = () => reject(new Error('Network error during upload to storage.'));
        xhr.onabort = () => reject(new Error('CANCELLED'));
        if (signal) signal.addEventListener('abort', () => xhr.abort());
        xhr.open('PUT', uploadUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
    });
