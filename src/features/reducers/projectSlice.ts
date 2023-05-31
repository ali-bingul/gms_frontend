import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../common/axiosApi';
import { httpConfig } from '../../helpers/httpConfig';
import { getToken } from '../../utils/AccessToken';

export const fetchAsyncProjectsData = createAsyncThunk("project/fetchAsyncProjectsData",
    async (paramData: any) => {
        const { where, limit, offset, year, term, lessonId } = paramData;
        const response = await axiosApi
            .get(`/project?where=${where}&limit=${limit}&offset=${offset}&year=${year}&term=${term}&lessonId=${lessonId}`, httpConfig("<tokendata>"));
        return response.data;
    });

export const fetchAsyncProjectsDataWithUserId = createAsyncThunk("project/fetchAsyncProjectsDataWithUserId",
    async (paramData: any) => {
        const { term, year, userId } = paramData;
        const response = await axiosApi
            .get(`/project/getProjectsWithUserId/${userId}?year=${year}&term=${term}`, httpConfig(getToken()));
        return response.data;
    });

export const fetchAsyncSingleProjectData = createAsyncThunk("project/fetchAsyncSingleProjectData",
    async (paramData: any) => {
        const { projectId } = paramData;
        const response = await axiosApi
            .get(`/project/${projectId}`, httpConfig(getToken()));
        return response.data;
    });

export const createProjectData = createAsyncThunk("project/createProjectData",
    async (paramData: any) => {
        const { formData } = paramData;
        const token = getToken();
        const response = await axiosApi
            .post(`/project`, formData, httpConfig(token));
        return response.data;
    });

const initialState = {
    projectsData: [],
    loadingProjectsData: true,
    createProjectDataResponse: {},
    singleProjectData: {},
    loadingSingleProjectData: true,
    projectsDataWithUserId: [],
    loadingProjectsDataWithUserId: true
};

const projectSlice = createSlice({
    name: "project",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncProjectsData.pending, (state) => {
            state.loadingProjectsData = true;
        });
        builder.addCase(fetchAsyncProjectsData.fulfilled, (state, { payload }) => {
            state.projectsData = payload;
            state.loadingProjectsData = false;
        });
        builder.addCase(fetchAsyncProjectsData.rejected, (state) => {
            state.loadingProjectsData = false;
        });
        builder.addCase(createProjectData.fulfilled, (state, { payload }) => {
            state.createProjectDataResponse = payload;
        });
        builder.addCase(fetchAsyncSingleProjectData.pending, (state) => {
            state.loadingSingleProjectData = true;
        });
        builder.addCase(fetchAsyncSingleProjectData.fulfilled, (state, { payload }) => {
            state.loadingSingleProjectData = false;
            state.singleProjectData = payload;
        });
        builder.addCase(fetchAsyncSingleProjectData.rejected, (state) => {
            state.loadingSingleProjectData = false;
        });
        builder.addCase(fetchAsyncProjectsDataWithUserId.pending, (state) => {
            state.loadingProjectsDataWithUserId = true;
        });
        builder.addCase(fetchAsyncProjectsDataWithUserId.fulfilled, (state, { payload }) => {
            state.loadingProjectsDataWithUserId = false;
            state.projectsDataWithUserId = payload;
        });
        builder.addCase(fetchAsyncProjectsDataWithUserId.rejected, (state) => {
            state.loadingProjectsDataWithUserId = false;
        });
    },
});

export default projectSlice.reducer;