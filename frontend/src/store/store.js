import { configureStore } from '@reduxjs/toolkit';
import authModalReducer from './slices/authModalSlice';
import authReducer from './slices/authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    authModal: authModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch