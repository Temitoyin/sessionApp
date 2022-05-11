import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from './Auth/authSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer
  },
});
