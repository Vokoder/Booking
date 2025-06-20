import { FirebaseError, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import * as constants from "./constants"
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG)

const app = initializeApp(firebaseConfig);

export const firebaseErrorToString = (e: FirebaseError) => {
    switch (e.code) {
        case "auth/email-already-in-use":
            return constants.EMAIL_ALREDY_IN_USE;
        case "auth/invalid-email":
            return constants.AUTH_INVALID_EMAIL;
        case "auth/weak-password":
            return constants.AUTH_WEAK_PASSWORD;
        case "auth/invalid-credential":
            return constants.AUTH_INVALID_CREDENTIAL;
        default:
            return e.message;
    }
}

export const auth = getAuth(app)
export const firestore = getFirestore(app)