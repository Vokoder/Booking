import { createContext } from 'react'
import type { Location } from '@/api/events/locations'

type LocationsContextType = {
  locations: Location[] | null
  setLocations: (locations: Location[] | null) => void
}

export const LocationsContext = createContext<LocationsContextType>({
  locations: null,
  setLocations: () => undefined,
})
