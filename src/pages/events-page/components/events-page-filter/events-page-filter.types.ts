import type { Location, Category } from '@/api/events'

export interface Filter {
  title?: string
  authorName?: string //TODO
  location?: Location
  category?: Category
  date?: Date
  eventType: EventType
}

export type EventType = 'upcoming' | 'past' | 'booked' | 'my'

export interface EventValue {
  label: string
  value: EventType
}
