import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	isLoaded: false,
	data: [],
	filtered: [],
};

const listingsSlice = createSlice({
	name: "listings",
	initialState,
	reducers: {
		updateListings: (state, action) => {
			return {
				isLoaded: true,
				data: action.payload,
				filtered: action.payload,
			};
		},
		updatefilteredListingsReducer: (state, action) => {
			return {
				...state,
				filtered: action.payload,
			};
		},
	},
});

export const { updateListings, updatefilteredListingsReducer } =
	listingsSlice.actions;
export default listingsSlice.reducer;
