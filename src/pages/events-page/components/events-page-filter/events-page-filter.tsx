import { Button, Col, Row } from 'antd'
import type { Filter } from './events-page-filter.types'
import { useForm, useWatch } from 'react-hook-form'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import styles from './events-page-filter.module.css'
import { InputField, SelectField, RadioField, DateField } from '@/components/form'
import { useEffect } from 'react'
import { authors, locations } from '../filter-inputs-options'
import { EVENT_TYPES, DEFAULT_EVENT_TYPE } from './events-page-filter.constants'
import { UseCategories } from '../use-categories'

interface EventsPageFilterProps {
  setFilter: (props: Filter) => void
}

const createEventHandler = () => {
  alert('create event') //TODO
}

const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
}

export const EventsPageFilter = ({ setFilter }: EventsPageFilterProps) => {
  const { control } = useForm<Filter>()
  const watch = useWatch({ control })
  const { getCategories } = UseCategories()

  useEffect(() => {
    const currentFilter: Filter = {
      title: watch.title,
      authorName: watch.authorName,
      location: watch.location,
      category: watch.category,
      date: watch.date,
      eventType: watch.eventType ? watch.eventType : 'upcoming', //TODO to delete
    }
    setFilter(currentFilter)
  }, [watch.title, watch.authorName, watch.location, watch.category, watch.date, watch.eventType, setFilter])

  return (
    <form onSubmit={submitHandler}>
      <Row gutter={[16, 32]}>
        <Col span={24}>
          <InputField<Filter>
            placeholder="123"
            prefix={<SearchOutlined />}
            className={styles.titleSearch}
            control={control}
            controllerName="title"
            required={false}
          />
        </Col>
        <Col span={24}>
          <Row align="bottom" gutter={[32, 0]}>
            <Col>
              <SelectField<Filter>
                control={control}
                controllerName="authorName"
                required={false}
                placeholder="234"
                options={authors}
                label="Автор"
                className={styles.dropDownFilters}
                showSearch
              />
            </Col>
            <Col>
              <SelectField<Filter>
                control={control}
                controllerName="location"
                required={false}
                placeholder="345"
                options={locations}
                label="Локация"
                className={styles.dropDownFilters}
                showSearch
              />
            </Col>
            <Col>
              <SelectField<Filter>
                control={control}
                controllerName="category"
                required={false}
                placeholder="456"
                options={categiries}
                label="Категория"
                className={styles.dropDownFilters}
                showSearch
              />
            </Col>
            <Col>
              <DateField<Filter> control={control} controllerName="date" required={false} label="Дата" />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col>
              <RadioField<Filter>
                control={control}
                controllerName="eventType"
                required={true}
                options={EVENT_TYPES}
                defaultValue={DEFAULT_EVENT_TYPE}
                className={styles.radioFilter}
              />
            </Col>
            <Col>
              <Button onClick={createEventHandler} type="primary">
                <PlusOutlined />
                Создать мероприятие
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </form>
  )
}
