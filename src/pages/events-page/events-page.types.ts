export interface Filter {
  title?: string,
  authorName?: string,
  location?: string,//TODO
  category?: string,//TODO
  date?: Date,
  eventType: EventType,
}

export type EventType = 'upcoming' | 'past' | 'booked' | 'my';