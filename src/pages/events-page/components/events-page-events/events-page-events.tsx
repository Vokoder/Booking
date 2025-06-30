import { useState } from 'react'
import { EventsPageFilter } from '../events-page-filter'
import { EventsPageSection } from '../events-page-section'
import type { Filter } from '../events-page-filter/events-page-filter.types'
import { Col, Row } from 'antd'
import { useEventsLoader } from '../use-events-loader'

export const EventsPageEvents = () => {
  const [filter, setFilter] = useState<Filter>({
    eventType: 'upcoming',
  })

  useEventsLoader()
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
