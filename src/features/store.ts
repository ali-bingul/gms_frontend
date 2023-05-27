import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import projectSlice from './reducers/projectSlice';

const reducer = {
    auth: authSlice,
    project: projectSlice
};

export const store = configureStore({
    reducer
});