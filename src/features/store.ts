import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';

const reducer = {
    auth: authSlice
};

export const store = configureStore({
    reducer
});