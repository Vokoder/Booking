import { type EventType, type EventValue } from './events-page-filter.types'

export const EVENT_TYPES: EventValue[] = [
  { label: 'Актуальные', value: 'upcoming' },
  { label: 'Прошедшие', value: 'past' },
  { label: 'Забронированные', value: 'booked' },
  { label: 'Мои мероприятия', value: 'my' },
]

export const DEFAULT_EVENT_TYPE: EventType = 'upcoming'
