import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../common/axiosApi';
import { httpConfig } from '../../helpers/httpConfig';

export const loginUserAsync = createAsyncThunk('user/loginUserAsync',
    async (paramData: any, { rejectWithValue }) => {
        try {
            const { data } = paramData;
            const response = await axiosApi
                .post(`/auth/login`, data, httpConfig("<tokendata>"));
            return response.data;
        } catch (e: any) {
            rejectWithValue(e.message);
        }
    });