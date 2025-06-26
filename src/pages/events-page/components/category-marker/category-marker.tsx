import { Tag } from "antd"
import { UseCategories } from "../use-categories"

interface CategoryMarkerProps {
  id: number;
}

export const CategoryMarker = ({ id }: CategoryMarkerProps) => {
  const { getCategoryById } = UseCategories()
  const category = getCategoryById(id)
  return (
    <Tag color={category?.color}>
      {category?.name}
    </Tag>
  )
}