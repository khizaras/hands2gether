import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { Provider } from "react-redux";
import { store } from "./store";
import firebaseApp from "./firebase";
import logger from "./widgets/logger";
window.logger = logger;

const root = document.getElementById("root");
createRoot(root).render(
	<Provider store={store}>
		<App />
	</Provider>
);
