import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../common/axiosApi';
import { httpConfig } from '../../helpers/httpConfig';
import { getToken } from '../../utils/AccessToken';

export const getUsersDataWithProjectCount = createAsyncThunk('user/getUsersDataWithProjectCount',
    async () => {
        const response = await axiosApi
            .get(`/project/getUsersProjects`, httpConfig(getToken()));
        return response.data;
    });

const initialState = {
    usersDataWithProjectCount: [],
    loadingUsersDataWithProjectCount: true
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsersDataWithProjectCount.pending, (state) => {
            state.loadingUsersDataWithProjectCount = true;
        });
        builder.addCase(getUsersDataWithProjectCount.fulfilled, (state, { payload }) => {
            state.loadingUsersDataWithProjectCount = false;
            state.usersDataWithProjectCount = payload;
        });
        builder.addCase(getUsersDataWithProjectCount.rejected, (state) => {
            state.loadingUsersDataWithProjectCount = false;
        });
    }
});

export default userSlice.reducer;