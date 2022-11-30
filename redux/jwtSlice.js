import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tokenJwt: null,
};

export const jwtSlice = createSlice({
  name: 'jwt',
  initialState,
  reducers: {
    setJwt: (state, action) => {
      state.tokenJwt = action.payload;
    },
  },
});

export const { setJwt } = jwtSlice.actions;

export default jwtSlice.reducer;
