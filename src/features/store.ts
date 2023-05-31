import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import projectSlice from './reducers/projectSlice';
import lessonSlice from './reducers/lessonSlice';

const reducer = {
    auth: authSlice,
    project: projectSlice,
    lesson: lessonSlice
};

export const store = configureStore({
    reducer
});