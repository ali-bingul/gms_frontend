import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../common/axiosApi';
import { httpConfig } from '../../helpers/httpConfig';
import { getToken } from '../../utils/AccessToken';

export const fetchAsyncLessonDatas = createAsyncThunk("lesson/fetchAsyncLessonDatas",
    async () => {
        const response = await axiosApi
            .get(`/lesson`, httpConfig(getToken()));
        return response.data;
    });

export const fetchAsyncSingleLessonData = createAsyncThunk("lesson/fetchAsyncSingleLessonData",
    async (paramData: any) => {
        const { lessonId } = paramData;
        const response = await axiosApi
            .get(`/lesson/${lessonId}`, httpConfig(getToken()));
        return response.data;
    });

export const createLessonData = createAsyncThunk("lesson/createLesonData",
    async (paramData: any) => {
        const { data } = paramData;
        const response = await axiosApi
            .post(`/lesson`, data, httpConfig(getToken()));
        return response.data;
    });

export const updateLessonData = createAsyncThunk("lesson/updateLessonData",
    async (paramData: any) => {
        const { data, lessonId } = paramData;
        const response = await axiosApi
            .put(`/lesson/${lessonId}`, data, httpConfig(getToken()));
        return response.data;
    });

export const deleteLessonData = createAsyncThunk("lesson/deleteLessonData",
    async (paramData: any) => {
        const { lessonId } = paramData;
        const response = await axiosApi
            .delete(`/lesson/${lessonId}`, httpConfig(getToken()));
        return response.data;
    });

const initialState = {
    lessonDatas: [],
    loadingLessonDatas: true,
    singleLessonData: {},
    createLessonDataResponse: {},
    updateLessonDataResponse: {},
    deleteLessonDataResponse: {}
};

const lessonSlice = createSlice({
    name: "lesson",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncLessonDatas.pending, (state) => {
            state.loadingLessonDatas = true;
        });
        builder.addCase(fetchAsyncLessonDatas.fulfilled, (state, { payload }) => {
            state.loadingLessonDatas = false;
            state.lessonDatas = payload;
        });
        builder.addCase(fetchAsyncLessonDatas.rejected, (state) => {
            state.loadingLessonDatas = false;
        });
        builder.addCase(fetchAsyncSingleLessonData.fulfilled, (state, { payload }) => {
            state.singleLessonData = payload;
        });
        builder.addCase(createLessonData.fulfilled, (state, { payload }) => {
            state.createLessonDataResponse = payload;
        });
        builder.addCase(updateLessonData.fulfilled, (state, { payload }) => {
            state.updateLessonDataResponse = payload;
        });
        builder.addCase(deleteLessonData.fulfilled, (state, { payload }) => {
            state.deleteLessonDataResponse = payload;
        });
    }
});

export default lessonSlice.reducer;