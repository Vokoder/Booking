import { EventContext } from "@/app/events";
import { useContext } from "react";

export const UseEvents = () => {
  const { events, setEvents } = useContext(EventContext)

  const getEventById = (id: number) => {
    if (events) {
      const event = events.find(e => e.id === id)
      return event
    }
    return null
  }

  const getEvents = () => {
    return events
  }

  return {getEventById, getEvents}
}