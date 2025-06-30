import { useState, type ReactNode } from 'react'
import { EventContext } from './events-context'
import type { Event } from '@/api/events'

export const EventsContextProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[] | null>(null)
  const value = {
    events: events,
    setEvents: setEvents,
  }

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>
}
