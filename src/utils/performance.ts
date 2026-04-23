import axios from 'axios';

/**
 * Sends a lightweight GET request to the backend to wake up the Cloud Run instance.
 * This should be called as early as possible on entry pages like Login.
 */
export const preWarmBackend = async () => {
    try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        await axios.get(`${apiUrl}/api/public/ping`);
        console.log('[DEBUG] Backend pre-warmed successfully');
    } catch (e) {
        // Silently fail as this is a background task
        console.log('[DEBUG] Backend pre-warm ping failed (silent)');
    }
};
