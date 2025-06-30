import { useState, type ReactNode } from 'react'
import { AuthorsContext } from './authors-context'
import type { AuthorFilterOptionValue } from '@/pages/events-page/components'

export const AuthorsContextProvider = ({ children }: { children: ReactNode }) => {
  const [authors, setAuthors] = useState<AuthorFilterOptionValue[] | null>(null)
  const value = {
    authors: authors,
    setAuthors: setAuthors,
  }

  return <AuthorsContext.Provider value={value}>{children}</AuthorsContext.Provider>
}
