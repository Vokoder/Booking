import { useContext, useEffect, useState } from 'react'
import { EventsPageFilter } from '../events-page-filter'
import { EventsPageSection } from '../events-page-section'
import type { Filter } from '../events-page-filter/events-page-filter.types'
import { Col, Row } from 'antd'
import { UserContext } from '@/app/auth'
import { getCategories, getLocations, getEvents } from '@api/events'
import { LocationsContext, CategoriesContext, EventContext } from '@/app/events'

export const EventsPageEvents = () => {
  const [filter, setFilter] = useState<Filter>({
    eventType: 'upcoming',
  })

  const { user } = useContext(UserContext)
  const { setLocations } = useContext(LocationsContext)
  const { setCategories } = useContext(CategoriesContext)
  const { setEvents } = useContext(EventContext)

  useEffect(() => {
    if (!user?.uid) return;

    const loadAll = async () => {
      try {
        const [locations, categories, events] = await Promise.all([
          getLocations(user.uid),
          getCategories(user.uid),
          getEvents(user.uid),
        ]);

        setLocations(locations);
        setCategories(categories);
        setEvents(events);
      } catch (e) {
        if (e instanceof Error) { throw e } else { throw new Error("Ошибка получения ивентов") }
      }
    };

    loadAll();
  }, [
    user?.uid,
    setLocations,
    setCategories,
    setEvents,
  ]);

  return (
    <Row>
      <Col span={24}>
        <EventsPageFilter setFilter={setFilter} />
      </Col>
      <Col span={24}>
        <EventsPageSection filter={filter} setFilter={setFilter} />
      </Col>
    </Row>
  )
}
