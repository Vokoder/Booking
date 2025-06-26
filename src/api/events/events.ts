import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '@firebaseApi/firebase.api'
import type { Event } from './events.types'
import * as validation from '@constants/validation'

export const getEvents = async (uid: string) => {
  try {
    const eventDocRef = doc(firestore, 'events', uid)
    const eventDoc = await getDoc(eventDocRef)
    if (eventDoc.exists()) {
      const eventDocData = eventDoc.data()
      const eventData: Event[] = eventDocData.map(
        (event: Event) => {
          return {
            id: event.id,
            title: event.title,
            description: event.description,
            locationId: event.locationId,
            categoryId: event.categoryId,
            date: event.date,
            author: event.author,
            imageUrl: event.imageUrl,
            userIds: event.userIds,
          }
        },
      )
      return eventData
    } else {
      throw new Error(validation.GET_EVENTS_FAILED)
    }
  } catch (e) {
    if (e instanceof Error) {
      throw e
    } else {
      throw new Error(validation.GET_EVENTS_FAILED)
    }
  }
}
