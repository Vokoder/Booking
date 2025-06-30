import { AuthorsContext } from '@/app/events/authors-context'
import { useCallback, useContext } from 'react'
import type { AuthorOption } from '../events-page-filter'
import type { Event } from '@/api/events'

export const UseAuthors = () => {
  const { authors, setAuthors } = useContext(AuthorsContext)

  const getAuthorById = (id: number) => {
    if (authors) {
      const author = authors.find((c) => c.value === id)
      return author
    }

    const catchAuthor: AuthorOption = {
      value: 'null',
      label: 'Не удалось найти',
    }
    return catchAuthor
  }

  const getAuthors = () => {
    return authors ? authors : undefined
  }

  const addAuthor = (author: AuthorOption): void => {
    const authorsArray = getAuthors() ?? []
    setAuthors([...authorsArray, author])
  }

  const setAuthorsFromEvents = useCallback(
    (events: Event[]) => {
      const unique = Array.from(
        new Map(events.map((e) => [e.author.id, { value: e.author.id, label: e.author.name }])).values(),
      )
      setAuthors(unique)
    },
    [setAuthors],
  )

  return { getAuthorById, getAuthors, addAuthor, setAuthorsFromEvents }
}
