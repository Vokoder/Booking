import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import type { SignUp } from '@pages/sign-up'
import { auth, firestore } from '@firebaseApi/firebase.api'
import { doc, setDoc } from 'firebase/firestore'
import type { UserData } from '@/api/user'

export const signUp = async (data: SignUp) => {
  try {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e
    } else {
      throw new Error('Ошибка создания аккаунта')
    }
  }

  const user = auth.currentUser
  if (user) {
    try {
      await updateProfile(user, { displayName: data.firstName })
      const userDocRef = doc(firestore, 'users', user.uid)
      const userData: UserData = {
        uid: user.uid,
        firstName: data.firstName,
        aboutMe: data.aboutMe,
        email: data.email,
        createdAt: new Date(),
      }
      await setDoc(userDocRef, userData)
      return userData
    } catch (e) {
      if (e instanceof Error) {
        throw e
      } else {
        throw new Error('Ошибка обновления профиля')
      }
    }
  } else {
    throw new Error('Произошла ошибка аутентификации')
  }
}
