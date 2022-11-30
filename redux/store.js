import { configureStore } from '@reduxjs/toolkit';
import jwtSlice from './jwtSlice';

export const store = configureStore({
  reducer: {
    jwt: jwtSlice,
  },
});
