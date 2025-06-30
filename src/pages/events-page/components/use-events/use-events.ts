import { EventContext } from '@/app/events'
import { useContext } from 'react'
import type { EventType } from '../events-page-filter'
import { deleteEvent, updateEvent, type Event } from '@/api/events'
import { UserContext } from '@/app/auth'
import { UPDATE_EVENT_FAILED, DELETE_EVENT_FAILED, BOOK_FAILED } from './use-events.constants'
import { useEventsLoader } from '../use-events-loader'

export const UseEvents = () => {
  const { events } = useContext(EventContext)
  const { user } = useContext(UserContext)
  const { reload } = useEventsLoader()

  const getEventById = (id: string) => {
    if (events) {
      const event = events.find((e) => e.id === id)
      return event
    }
    return null
  }

  const getEvents = () => {
    return events
  }

  const bookEvent = async (event: Event, eventType: EventType) => {
    try {
      switch (eventType) {
        case 'upcoming':
          if (user?.uid) {
            event.userIds.push(user.uid)
            await updateEvent(event)
          } else {
            throw new Error(UPDATE_EVENT_FAILED)
          }
          break
        case 'booked':
          if (user?.uid) {
            event.userIds = event.userIds.filter((id) => id !== user.uid)
            await updateEvent(event)
          } else {
            throw new Error(UPDATE_EVENT_FAILED)
          }
          break
        case 'my':
          if (user?.uid) {
            await deleteEvent(event, user.uid)
          } else {
            throw new Error(DELETE_EVENT_FAILED)
          }
          break
        default:
          throw new Error(BOOK_FAILED)
      }
      await reload()
    } catch (e) {
      return e
    }
  }

  return { getEventById, getEvents, bookEvent }
}
