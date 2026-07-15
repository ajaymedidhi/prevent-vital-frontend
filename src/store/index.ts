import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthState, User } from '../types/auth';

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

// Validating localStorage data safety
const loadState = (): AuthState => {
    try {
        const token = sessionStorage.getItem('token');
        const user = sessionStorage.getItem('user');
        if (token && user) {
            return {
                token,
                user: JSON.parse(user),
                isAuthenticated: true
            };
        }
    } catch (err) {
        console.error("Failed to load auth state", err);
    }
    return initialState;
};

const authSlice = createSlice({
    name: 'auth',
    initialState: loadState(),
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

// Invalidates the session server-side (best-effort) before clearing local auth
// state — plain dispatch(logout()) only ever cleared the client, leaving the
// JWT/session valid server-side until it expired on its own.
export const performLogout = async (dispatch: AppDispatch) => {
    try {
        await axios.post('/api/auth/logout');
    } catch {
        // Best-effort — always clear local state even if the server call fails.
    }
    dispatch(logout());
};

import shopReducer from './shopSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        shop: shopReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
