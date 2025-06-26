import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '@firebaseApi/firebase.api'
import * as validation from '@constants/validation'
import type { Location } from './locations.types'

export const getLocations = async (uid: string) => {
  try {
    const locationDocRef = doc(firestore, 'locations', uid)
    const locationDoc = await getDoc(locationDocRef)
    if (locationDoc.exists()) {
      const locationDocData = locationDoc.data()
      const locationData: Location[] = locationDocData.map(
        (location: Location) => {
          return {
            id: location.id,
            name: location.name,
          }
        }
      )
      return locationData
    } else {
      throw new Error(validation.GET_LOCATIONS_FAILED)
    }
  } catch (e) {
    if (e instanceof Error) {
      throw e
    } else {
      throw new Error(validation.GET_LOCATIONS_FAILED)
    }
  }
}
