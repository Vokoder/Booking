import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../FireBaseConnection.tsx'
import { type ISignIn } from './IFormTypes.tsx'
import type { UseFormSetError } from 'react-hook-form'
import { GetUserData } from './GetUserData.tsx';
import { type IUserData } from './IUserDataType'

export const SignIn = async (data: ISignIn, setError: UseFormSetError<ISignIn>, setContextUser: any) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)

    const user = await auth.currentUser
    if (user) {
        const userData: IUserData = await GetUserData(user)
        await setContextUser(userData)
    }
}