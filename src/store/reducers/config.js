import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	filter: {
		category: null,
		location: {
			city: null,
			state: null,
			country: null,
		},
	},
};

const configSlice = createSlice({
	name: "config",
	initialState,
	reducers: {
		updateCityReducer: (state, action) => {
			return {
				...state,
				filter: {
					...state.filter,
					location: action.payload,
				},
			};
		},
	},
});

export const { updateCityReducer } = configSlice.actions;
export default configSlice.reducer;
