import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const signInWithCredentials = ({ email, password }) => {
	return new Promise((resolve, reject) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log({ userCredential });
				resolve(userCredential.user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				reject({ errorCode, errorMessage });
			});
	});
};
