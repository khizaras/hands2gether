import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();
const db = getFirestore();
connectFirestoreEmulator(db, "localhost", 8080);
connectAuthEmulator(auth, "http://localhost:9099",{ disableWarnings: true });


export const signInWithCredentials = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log({ userCredential });
            resolve(userCredential.user)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject({ errorCode, errorMessage })
        });
    });
}


