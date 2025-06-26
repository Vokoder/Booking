import type { Location } from "@/api/events";
import { LocationsContext } from "@/app/events";
import { useContext } from "react";

export const UseLocations = () => {
  const { locations, setLocations } = useContext(LocationsContext)

  const getLocationById = (id: number) => {
    if (locations) {
      const location = locations.find(l => l.id === id)
      return location
    }
    const catchLocation: Location = {
      id: 0,
      name: 'Не удалось найти',
    }
    return catchLocation
  }

  const getLocations = () => {
    return locations
  }

  return {getLocationById, getLocations}
}