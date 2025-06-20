import { doc, getDoc } from "firebase/firestore";
import { firebaseErrorToString, firestore } from "../firebase/firebase.api";
import type { UserData } from "./user-types";
import * as constants from "./constants";
import { FirebaseError } from "firebase/app";

export const getUserProfile = async (uid: string) => {
    try {
        const userDocRef = doc(firestore, 'users', uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const userDocData = userDoc.data()
            const userData: UserData = {
                uid: uid,
                email: userDocData?.email,
                firstName: userDocData?.firstName,
                aboutMe: userDocData?.aboutMe,
                createdAt: userDocData?.createdAt,
            };
            return userData
        } else {
            throw new Error(constants.GET_PROFILE_FAILED)
        }
    } catch (e) {
        if (e instanceof FirebaseError) {
            throw new Error(firebaseErrorToString(e))
        } else if (e instanceof Error) {
            throw e
        } else {
            throw new Error(constants.GET_PROFILE_FAILED)
        }
    }
}