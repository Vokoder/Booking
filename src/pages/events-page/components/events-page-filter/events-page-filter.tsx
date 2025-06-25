import { Col, Row } from "antd"
import type { Filter } from "../../events-page.types"

interface EventsPageFilterProps {
  filter: Filter,
  setFilter: (props: Filter) => void
}

export const EventsPageFilter = (props: EventsPageFilterProps) => {
  return (
    <Row>
      <Col span={24}>
        Поиск по названию
      </Col>
      <Col span={24}>
        Поиск дропдауны
      </Col>
      <Col span={24}>
        Радиобатоны
      </Col>
    </Row>
  )
}