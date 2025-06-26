import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '@firebaseApi/firebase.api'
import type { Category } from './categories.types'
import * as validation from '@constants/validation'

export const getCategories = async (uid: string) => {
  try {
    const categoryDocRef = doc(firestore, 'categories', uid)
    const categoryDoc = await getDoc(categoryDocRef)
    if (categoryDoc.exists()) {
      const categoryDocData = categoryDoc.data()
      const categoryData: Category[] = categoryDocData.map(
        (category: Category) => {
          return {
            id: category.id,
            name: category.name,
            color: category.color,
          }
        }
      )
      return categoryData
    } else {
      throw new Error(validation.GET_CATEGORIES_FAILED)
    }
  } catch (e) {
    if (e instanceof Error) {
      throw e
    } else {
      throw new Error(validation.GET_CATEGORIES_FAILED)
    }
  }
}
