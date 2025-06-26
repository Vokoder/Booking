import { type Category } from "@/api/events/categiries";
import { CategoriesContext } from "@/app/events";
import { useContext } from "react";

export const UseCategories = () => {
  const { categories, setCategories } = useContext(CategoriesContext)

  const getCategoryById = (id: number) => {
    if (categories) {
      const category = categories.find(c => c.id === id)
      return category
    }
    const catchCategory: Category = {
      id: 0,
      name: 'Не удалось найти',
      color: 'red',
    }
    return catchCategory
  }

  const getCategories = () => {
    return categories
  }

  const getCategoiesOption = () => {
    if (categories) {
      return categories.map
    }
  }

  return {getCategoryById, getCategories, getCategoiesOption}
}