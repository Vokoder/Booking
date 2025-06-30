import { Button, Col, Row, Typography, Image } from 'antd'
import styles from './event-card.module.css'
import { CategoryMarker } from '../category-marker'
import { getEventType, type Event } from '@/api/events'
import { useContext } from 'react'
import { UserContext } from '@/app/auth'
import { BOOK, CANCEL_BOOK } from './evetn-card.constants'
import { UseLocations } from '../use-locations'
import { UseEvents } from '../use-events'

const { Text, Title } = Typography

interface EventCardProps {
  event: Event
}

export const EventCard = ({ event }: EventCardProps) => {
  const { title, locationId, categoryId, imageUrl, date, author, userIds } = event
  const { user } = useContext(UserContext)
  const { getLocationById } = UseLocations()
  const userUid = user ? user.uid : ''
  const { bookEvent } = UseEvents()

  const eventType = getEventType(author.id, userIds, userUid, date)

  return (
    <Row className={styles.card}>
      <Col span={24} className={styles.header}>
        <Row gutter={[0, 4]}>
          <Col span={24}>
            <Title level={4} className={styles.title} ellipsis>
              {title}
            </Title>
          </Col>
          <Col span={24}>
            <Row justify="space-between" align="middle">
              <Col>
                <Text>Локация: {getLocationById(locationId)?.label}</Text>
              </Col>
              <Col>
                <Text>
                  Категория: <CategoryMarker id={categoryId} />
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Image src={imageUrl} preview={false} className={styles.image} />
      </Col>
      <Col span={24} className={styles.footer}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Row justify="space-between">
              <Col span={12}>
                <Text>Дата: {date.toLocaleDateString()}</Text>
              </Col>
              <Col>
                <Text>{author.name}</Text>
              </Col>
            </Row>
          </Col>
          {eventType === 'my' ? (
            <Text>Количество участников: {userIds.length}</Text>
          ) : (
            eventType !== 'past' && (
              <Button
                block
                type={eventType === 'booked' ? 'default' : 'primary'}
                variant={eventType === 'booked' ? 'filled' : 'solid'}
                onClick={() => bookEvent(event, eventType)}
              >
                {eventType === 'booked' ? CANCEL_BOOK : BOOK}
              </Button>
            )
          )}
        </Row>
      </Col>
    </Row>
  )
}
