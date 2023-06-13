import React from "react";
import { createRoot } from "react-dom/client";
import firebaseApp from './firebase';
import App from "./app";
import { Provider } from 'react-redux';
import { store } from './store';
import  firebaseapp from './firebase'


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
