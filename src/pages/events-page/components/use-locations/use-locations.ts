import type { Location } from '@/api/locations'
import { LocationsContext } from '@/app/events'
import { useContext } from 'react'

export const UseLocations = () => {
  const { locations } = useContext(LocationsContext)

  const getLocationById = (id: number) => {
    if (locations) {
      const location = locations.find((l) => l.value === id)
      return location
    }

    const catchLocation: Location = {
      value: 0,
      label: 'Не удалось найти',
    }
    return catchLocation
  }

  const getLocations = () => {
    return locations ? locations : undefined
  }

  return { getLocationById, getLocations }
}
