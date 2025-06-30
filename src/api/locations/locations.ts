import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@firebaseApi/firebase.api'
import * as validation from '@constants/validation'
import type { Location } from './locations.types'

export const getLocations = async () => {
  try {
    const locationColRef = collection(firestore, 'locations')
    const snapshot = await getDocs(locationColRef)
    if (snapshot.empty) {
      throw new Error(validation.GET_LOCATIONS_FAILED)
    }
    const locations: Location[] = snapshot.docs.map((docSnap) => {
      const data: Location = {
        value: docSnap.data().id,
        label: docSnap.data().name,
      }
      return data
    })
    return locations
  } catch (e) {
    if (e instanceof Error) {
      throw e
    } else {
      throw new Error(validation.GET_LOCATIONS_FAILED)
    }
  }
}
