import { Col, Row } from 'antd'
import type { Filter } from '../events-page-filter/events-page-filter.types'
import styles from './events-page-section.module.css'
import { EventCard } from '../event-card'
import { useState } from 'react'
import type { Event } from '@/api/events'

interface EventsPageSectionProps {
  filter: Filter
  setFilter: (props: Filter) => void
}

export const EventsPageSection = ({ filter, setFilter }: EventsPageSectionProps) => {
  const [events, setEvents] = useState<Event[] | null>()

  return (
    <Row className={styles.eventsBackground}>
      <Col span={24}>
        {events ?
          events.map((event) => {
            return (
              <EventCard
                event={event}
              />
            )
          })
          : "Ивенты отсутствуют"}
        {/* <EventCard
          event={{id = 1
          title="Название"
          locationId={1}
          categoryId={1}
          date={new Date('13.04.2005')}
          owner="me"
          imageUrl="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}}
        /> */}
      </Col>
      <Col span={24}>
        Название: {filter.title}
        <br />
        Автор: {filter.authorName} | Локация: {filter.location?.name} | Категория: {filter.category?.name} | Дата:{' '}
        {filter.date?.toLocaleDateString()}
        <br />
        Тип: {filter.eventType}
      </Col>
    </Row>
  )
}
