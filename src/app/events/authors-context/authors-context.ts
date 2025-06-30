import { createContext } from 'react'
import type { AuthorFilterOptionValue } from '@/pages/events-page/components'

type AuthorsContextType = {
  authors: AuthorFilterOptionValue[] | null
  setAuthors: (authors: AuthorFilterOptionValue[] | null) => void
}

export const AuthorsContext = createContext<AuthorsContextType>({
  authors: null,
  setAuthors: () => undefined,
})
