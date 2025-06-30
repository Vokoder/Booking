export interface Filter {
  title?: string
  author?: string
  location?: number
  category?: number
  date?: Date
  eventType: EventType
}

export type EventType = 'upcoming' | 'past' | 'booked' | 'my'

export interface EventValue {
  label: string
  value: EventType
}

export interface FilterOptionValue {
  value: number
  label: string
}

export interface AuthorOption {
  value: string
  label: string
}
