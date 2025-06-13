import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from '../FireBaseConnection.tsx'
import { type ISignUp } from './IFormTypes.tsx'
import { GetUserData } from './GetUserData.tsx';
import { type IUserData } from './IUserDataType'

export const SignUp = async (data: ISignUp, setContextUser: any, contextUser: any) => {

    await createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((data)=>{
        console.log(data)
    })
    .catch((error) => {
        console.log(error.message)//Добавить вывод ошибки
        return null
    })
    
    const user = await auth.currentUser
    await console.log(user)
    if (user) {
        await updateProfile(user, { displayName: data.firstName })
        const userDocRef = doc(firestore, 'users', user.uid)
        await setDoc(userDocRef, {
            firstName: data.firstName,
            aboutMe: data.aboutMe,
            email: data.email,
            createdAt: new Date()
        })
        const userData: IUserData = await GetUserData(user)
        await setContextUser(userData)
        await console.log(contextUser)
    }
}