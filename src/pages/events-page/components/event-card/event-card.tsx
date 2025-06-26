import { Button, Col, Row, Typography, Image } from 'antd'
import styles from './event-card.module.css'
import { CategoryMarker } from '../category-marker'
import type { Event } from '@/api/events'
import { useContext } from 'react'
import { UserContext } from '@/app/auth'
import type { CardType } from './event-card.types'
import { BOOK, CANCEL_BOOK } from './evetn-card.constants'

const { Text, Title } = Typography

const clickHandler = (id: number, cardType: CardType) => {
  alert(id)//TODO
}

const getCardType = (authorId: string, userIds: string[], uid: string) => {
  let cardType: CardType = 'book'
  if (authorId === uid) {
    cardType = 'my'
  } else if (userIds.includes(uid)) {
    cardType = 'cancel book'
  }
  return cardType
}

interface EventCardProps {
  event: Event
}

export const EventCard = ({ event }: EventCardProps) => {
  const { title,
    locationId,
    categoryId,
    imageUrl, date, authorId, id, userIds } = event
  const { user } = useContext(UserContext)
  const userUid = user ? user.uid : ""

  const cardType = getCardType(authorId, userIds, userUid)

  return (
    <Row className={styles.card}>
      <Col span={24} className={styles.header}>
        <Row gutter={[0, 4]}>
          <Col span={24}>
            <Title level={3} className={styles.title}>
              {title}
            </Title>
          </Col>
          <Col span={24}>
            <Row justify="space-between" align="middle">
              <Col span={12}>
                <Text>Локация: {locationId}</Text>
              </Col>
              <Col>
                <Text>Категория: <CategoryMarker id={categoryId} /></Text>
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
                <Text>{author}</Text>
              </Col>
            </Row>
          </Col>
          {
            cardType === 'my' ? (<Text>Количество участников: {userIds.length}</Text>) :
              (
                <Button
                  block
                  type={cardType === 'book' ? 'primary' : 'default'}
                  variant={cardType === 'cancel book' ? 'filled' : 'solid'}
                  onClick={() => clickHandler(id, cardType)}
                >
                  {cardType === 'book' ? BOOK : CANCEL_BOOK}
                </Button>
              )

          }
        </Row>
      </Col>
    </Row>
  )
}
