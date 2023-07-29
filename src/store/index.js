import { configureStore } from "@reduxjs/toolkit";
import promise from "redux-promise";
import { combineReducers, compose } from "redux";
import authSlice from "./reducers/auth";
import categoriesSlice from "./reducers/categories";
import listingsSlice from "./reducers/listings";
import configSlice from "./reducers/config";

const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				trace: true,
				traceLimit: 25,
		  })
		: compose;

export const store = configureStore({
	reducer: combineReducers({
		user: authSlice,
		categories: categoriesSlice,
		listings: listingsSlice,
		config: configSlice,
	}),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(promise),

	devTools: composeEnhancers,
});
