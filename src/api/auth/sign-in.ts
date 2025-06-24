import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@firebaseApi/firebase.api'
import { getUserProfile } from '../user/user'
import { type SignIn } from '@/pages/auth/components/form.types'
import { type UserData } from '@/api/user'

export const signIn = async (data: SignIn) => {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password)
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e
    } else {
      throw new Error('Ошибка авторизации')
    }
  }

  const user = auth.currentUser
  if (user) {
    try {
      const userData: UserData = await getUserProfile(user.uid)
      return userData
    } catch (e) {
      if (e instanceof Error) {
        throw e
      } else {
        throw new Error('Ошибка при получении данных пользователя')
      }
    }
  } else {
    throw new Error('Произошла ошибка аутентификации')
  }
}
