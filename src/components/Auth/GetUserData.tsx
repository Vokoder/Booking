import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../FireBaseConnection";
import type { User } from "firebase/auth";
import { type IUserData } from './IUserDataType'

const fetchUserProfile = async (uid: string) => {
    const userDocRef = doc(firestore, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
        const userData = userDoc.data()
        return {
            firstName: userData.firstName,
            aboutMe: userData.aboutMe
        }
    }
    return null;
};

export const GetUserData = async (user: User) => {
    const additionalData = await fetchUserProfile(user.uid);
    const userData: IUserData = {
        email: user.email,
        firstName: additionalData?.firstName,
        aboutMe: additionalData?.aboutMe,
    };
    console.log('профиль пользователя', userData);
    return userData
}