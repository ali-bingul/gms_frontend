import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../common/axiosApi';
import { httpConfig } from '../../helpers/httpConfig';
import { removeToken, setToken } from '../../utils/AccessToken';

export const loginUserAsync = createAsyncThunk('auth/loginUserAsync',
    async (paramData: any, { rejectWithValue }) => {
        try {
            const { data } = paramData;
            const response = await axiosApi
                .post(`/auth/login`, data, httpConfig("<tokendata>"));
            if (response.status === 200 && response.data.success) {
                setToken(response.data.data.toString());
                console.log(response.data.data);
            }
            console.log("response", response);
            return response.data;
        } catch (e: any) {
            rejectWithValue(e.message);
        }
    });

const initialState = {
    loginUserResponse: {}
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            // remove token
            removeToken();
            window.location.reload();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUserAsync.fulfilled, (state, { payload }) => {
            state.loginUserResponse = payload;
        });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;