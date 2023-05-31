import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import projectSlice from './reducers/projectSlice';
import lessonSlice from './reducers/lessonSlice';
import userSlice from './reducers/userSlice';

const reducer = {
    auth: authSlice,
    project: projectSlice,
    lesson: lessonSlice,
    user: userSlice
};

export const store = configureStore({
    reducer
});