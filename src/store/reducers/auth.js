import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isAuth: false,
  user: null,
  error: null,
  geolocation: {}
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
    updateGeolocation: (state, action) => {
      return {
        ...state,
        geolocation: action.payload
      };
    }
  }
});

export const { updateAuth, updateGeolocation } = authSlice.actions;
export default authSlice.reducer;
