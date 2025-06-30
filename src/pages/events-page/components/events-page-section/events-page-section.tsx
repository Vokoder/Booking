import { Col, Row } from 'antd'
import type { Filter } from '../events-page-filter/events-page-filter.types'
import styles from './events-page-section.module.css'
import { EventCard } from '../event-card'
import { getEventType } from '@/api/events'
import { useContext, useEffect, useState } from 'react'
import type { Event } from '@/api/events'
import { EventContext } from '@/app/events'
import { UserContext } from '@/app/auth'

interface EventsPageSectionProps {
  filter: Filter
  setFilter: (props: Filter) => void
}

const isDatesMatch = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

export const EventsPageSection = ({ filter }: EventsPageSectionProps) => {
  const [filtredEvents, setFiltredEvents] = useState<Event[] | null>()
  const { events } = useContext(EventContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    setFiltredEvents(
      events?.filter((event) => {
        const eventType = user ? getEventType(event.author.id, event.userIds, user.uid, event.date) : null
        if (filter.author !== null && filter.author !== undefined && event.author.id !== filter.author) return false
        if (filter.category !== null && filter.category !== undefined && event.categoryId !== filter.category)
          return false
        if (filter.date !== null && filter.date !== undefined && !isDatesMatch(event.date, filter.date)) return false
        if (
          filter.eventType !== null &&
          filter.eventType !== undefined &&
          eventType !== null &&
          eventType !== filter.eventType
        )
          return false
        if (filter.location !== null && filter.location !== undefined && event.locationId !== filter.location)
          return false
        if (filter.title !== null && filter.title !== undefined && !event.title.includes(filter.title)) return false

        return true
      }),
    )
  }, [events, filter, user])

  const eventCards = filtredEvents
    ? filtredEvents.map((event, key) => {
        return (
          <Col key={key}>
            <EventCard event={event} />
          </Col>
        )
      })
    : 'Ивенты отсутствуют'

  return (
    <Row className={styles.eventsBackground}>
      <Col span={24}>
        <Row gutter={[8, 8]}>{eventCards}</Row>
      </Col>
    </Row>
  )
}
