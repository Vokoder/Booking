import { collection, deleteDoc, doc, getDocs, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { firestore } from '@firebaseApi/firebase.api'
import type { Author, Event } from './events.types'
import * as validation from '@constants/validation'
import { getUserProfile } from '../user'

export const getEvents = async (): Promise<Event[]> => {
  try {
    const eventsColRef = collection(firestore, 'events')
    const snapshot = await getDocs(eventsColRef)
    if (snapshot.empty) {
      throw new Error(validation.GET_LOCATIONS_FAILED)
    }

    const events: Event[] = []
    for (const docSnap of snapshot.docs) {
      if (!docSnap.exists) continue
      const raw = docSnap.data()
      const authorProfile = await getUserProfile(raw.authorId)

      const author: Author = {
        id: authorProfile?.uid ?? 'null',
        name: authorProfile?.firstName ?? 'null',
      }

      events.push({
        id: raw.id,
        title: raw.title,
        description: raw.description,
        locationId: raw.locationId,
        categoryId: raw.categoryId,
        date: (raw.date as Timestamp).toDate(),
        author: author,
        imageUrl: raw.imageUrl,
        userIds: raw.userIds,
      })
    }

    return events
  } catch (e) {
    if (e instanceof Error) throw e
    throw new Error(validation.GET_EVENTS_FAILED)
  }
}

export const addEvent = async (event: Event) => {
  const eventRef = doc(firestore, 'events', event.id.toString())
  try {
    await setDoc(eventRef, { ...event })
  } catch (e) {
    if (e instanceof Error) throw e
    throw new Error(validation.ADD_EVENT_FAILED)
  }
}

export const updateEvent = async (event: Event) => {
  if (event.id) {
    try {
      const eventRef = doc(firestore, 'events', event.id.toString())
      await updateDoc(eventRef, { ...event })
    } catch (e) {
      if (e instanceof Error) throw e
      throw new Error(validation.UPDATE_EVENT_FAILED)
    }
  }
}

export const deleteEvent = async (event: Event, uid: string) => {
  if (event.author.id === uid) {
    try {
      const eventRef = doc(firestore, 'events', event.id.toString())
      await deleteDoc(eventRef)
    } catch (e) {
      if (e instanceof Error) throw e
      throw new Error(validation.DELETE_EVENT_FAILED)
    }
  } else {
    throw new Error(validation.NOT_MY_EVENT)
  }
}

const isTodayBeforeEvent = (eventDate: Date): boolean => {
  const today = new Date()
  const current = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const event = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate())
  return current <= event
}

export const getEventType = (authorId: string, userIds: string[], uid: string, eventDate?: Date) => {
  if (eventDate && !isTodayBeforeEvent(eventDate)) {
    return 'past'
  }
  if (authorId === uid) {
    return 'my'
  }
  if (userIds.includes(uid)) {
    return 'booked'
  }
  return 'upcoming'
}
