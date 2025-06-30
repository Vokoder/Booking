import { type Category } from '@/api/categiries'
import { CategoriesContext } from '@/app/events'
import { useContext } from 'react'

export const UseCategories = () => {
  const { categories } = useContext(CategoriesContext)

  const getCategoryById = (id: number) => {
    if (categories) {
      const category = categories.find((c) => c.value === id)
      return category
    }

    const catchCategory: Category = {
      value: 0,
      label: 'Не удалось найти',
      color: 'red',
    }
    return catchCategory
  }

  const getCategories = () => {
    return categories ? categories : undefined
  }

  return { getCategoryById, getCategories }
}
