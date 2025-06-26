import { createContext } from 'react'
import type { Category } from '@/api/events/categiries'

type CategoriesContextType = {
  categories: Category[] | null
  setCategories: (categories: Category[] | null) => void
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: null,
  setCategories: () => undefined,
})
