import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	isLoaded: false,
	data: [],
	filtered: [],
	comments: [],
};

const listingsSlice = createSlice({
	name: "listings",
	initialState,
	reducers: {
		updateComments: (state, action) => {
			return {
				...state,
				comments: action.payload,
			};
		},
		updateListings: (state, action) => {
			return {
				...state,
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

export const { updateListings, updatefilteredListingsReducer, updateComments } =
	listingsSlice.actions;
export default listingsSlice.reducer;
