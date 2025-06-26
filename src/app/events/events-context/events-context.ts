import type { Event } from '@/api/events'
import { createContext } from 'react'

type EventsContextType = {
  events: Event[] | null
  setEvents: (event: Event[] | null) => void
}

export const EventContext = createContext<EventsContextType>({
  events: null,
  setEvents: () => undefined,
})
