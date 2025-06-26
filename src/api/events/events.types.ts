export interface Event {
  id: number
  title: string
  description: string
  locationId: number
  categoryId: number
  date: Date
  authorId: string
  imageUrl: string
  userIds: string[]
}
