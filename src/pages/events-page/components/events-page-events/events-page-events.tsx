import { useState } from "react"
import { EventsPageFilter } from "../events-page-filter"
import { EventsPageSection } from "../events-page-section"
import type { Filter } from "../../events-page.types"
import { Col, Row } from "antd"

export const EventsPageEvents = () => {
  const [filter, setFilter] = useState<Filter>({
    eventType: 'upcoming'
  })
  return (
    <Row>
      <Col span={24}>
        <EventsPageFilter filter={filter} setFilter={setFilter} />
      </Col>
      <Col span={24}>
        <EventsPageSection filter={filter} setFilter={setFilter} />
      </Col>
    </Row>
  )
}