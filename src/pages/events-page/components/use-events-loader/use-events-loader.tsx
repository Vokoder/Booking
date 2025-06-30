import { useCallback, useContext, useEffect } from 'react'
import { UserContext } from '@/app/auth'
import { getEvents } from '@api/events'
import { getLocations } from '@/api/locations'
import { getCategories } from '@/api/categiries'
import { LocationsContext, CategoriesContext, EventContext } from '@/app/events'
import { UseAuthors } from '@/pages/events-page/components/use-authors'

export const useEventsLoader = () => {
  const { user } = useContext(UserContext)
  const { setLocations } = useContext(LocationsContext)
  const { setCategories } = useContext(CategoriesContext)
  const { setEvents } = useContext(EventContext)
  const { setAuthorsFromEvents } = UseAuthors()

  const fetchAll = useCallback(async () => {
    if (!user?.uid) return
    try {
      const [locs, cats, evts] = await Promise.all([getLocations(), getCategories(), getEvents()])
      if (locs) setLocations(locs)
      if (cats) setCategories(cats)
      setEvents(evts)
      setAuthorsFromEvents(evts)
    } catch (e) {
      return e
    }
  }, [user?.uid, setLocations, setCategories, setEvents, setAuthorsFromEvents])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return { reload: fetchAll }
}
