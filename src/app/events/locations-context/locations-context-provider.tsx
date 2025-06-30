import { useState, type ReactNode } from 'react'
import { LocationsContext } from './locations-context'
import { type Location } from '@/api/locations'

export const LocationsContextProvider = ({ children }: { children: ReactNode }) => {
  const [locations, setLocations] = useState<Location[] | null>(null)
  const value = {
    locations: locations,
    setLocations: setLocations,
  }

  return <LocationsContext.Provider value={value}>{children}</LocationsContext.Provider>
}
