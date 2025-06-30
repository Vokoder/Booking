import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@firebaseApi/firebase.api'
import type { Category } from './categories.types'
import * as validation from '@constants/validation'

export const getCategories = async () => {
  try {
    const categoriesColRef = collection(firestore, 'categories')
    const snapshot = await getDocs(categoriesColRef)
    if (snapshot.empty) {
      throw new Error(validation.GET_LOCATIONS_FAILED)
    }
    const categories: Category[] = snapshot.docs.map((docSnap) => {
      const data: Category = {
        value: docSnap.data().id,
        label: docSnap.data().name,
        color: docSnap.data().color,
      }
      return data
    })
    return categories
  } catch (e) {
    if (e instanceof Error) {
      throw e
    } else {
      throw new Error(validation.GET_CATEGORIES_FAILED)
    }
  }
}
