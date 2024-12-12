import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: { nickname: string } | null;
    isLoading: boolean;
    error: string | null;
}

interface LoginPayload {
    nickname: string;
    password: string;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state, action: PayloadAction<LoginPayload>) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action: PayloadAction<{ nickname: string }>) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
