import { Row } from "antd"
import type { Filter } from "../../events-page.types"

interface EventsPageSectionProps {
  filter:Filter,
  setFilter: (props:Filter) => void
}

export const EventsPageSection = (props:EventsPageSectionProps) => {
  return (
    <Row>
      section
    </Row>
  )
}