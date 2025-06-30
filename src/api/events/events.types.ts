export interface Event {
  id: string
  title: string
  description: string
  locationId: number
  categoryId: number
  date: Date
  author: Author
  imageUrl: string
  userIds: string[]
}

export interface Author {
  id: string
  name: string
}
