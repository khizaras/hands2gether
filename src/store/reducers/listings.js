import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoaded: false,
  data: [],
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    updateListings: (state, action) => {
      return {
        isLoaded: true,
        data: action.payload,
      };
    },
  },
});

export const { updateListings } = listingsSlice.actions;
export default listingsSlice.reducer;
