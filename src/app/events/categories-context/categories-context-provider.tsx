import type { Category } from '@/api/categiries'
import { useState, type ReactNode } from 'react'
import { CategoriesContext } from './categories-context'

export const CategoryContextProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[] | null>(null)
  const value = {
    categories: categories,
    setCategories: setCategories,
  }

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
