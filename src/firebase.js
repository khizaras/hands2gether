import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
	apiKey: "AIzaSyBE8Q0A9fqdta_xeZC1Y00J5qI9A21Cj04",
	authDomain: "hands2gether-c49c0.firebaseapp.com",
	databaseURL: "https://hands2gether-c49c0-default-rtdb.firebaseio.com",
	projectId: "hands2gether-c49c0",
	storageBucket: "hands2gether-c49c0.appspot.com",
	messagingSenderId: "911777939876",
	appId: "1:911777939876:web:2b453745143d43d0cd4131",
	measurementId: "G-LYQ8KZ8SHE",
};
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;

const storage = getStorage();
const db = getFirestore();
const auth = getAuth();
connectFirestoreEmulator(db, "localhost", 8080);
connectStorageEmulator(storage, "localhost", 9199);
connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
export { firebaseApp, storage, db, auth };
