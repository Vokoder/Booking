import { Button, Col, Row } from 'antd'
import type { AuthorOption, Filter } from './events-page-filter.types'
import { useForm, useWatch } from 'react-hook-form'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import styles from './events-page-filter.module.css'
import { InputField, SelectField, RadioField, DateField } from '@/components/form'
import { useEffect } from 'react'
import { EVENT_TYPES, DEFAULT_EVENT_TYPE } from './events-page-filter.constants'
import { UseCategories } from '../use-categories'
import { UseLocations } from '../use-locations'
import { UseAuthors } from '../use-authors'

interface EventsPageFilterProps {
  setFilter: (props: Filter) => void
}

const createEventHandler = () => {
  alert('Извините, функция пока не доступна')
}

const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
}

export const EventsPageFilter = ({ setFilter }: EventsPageFilterProps) => {
  const { control } = useForm<Filter>()
  const watch = useWatch({ control })
  const { getCategories } = UseCategories()
  const { getLocations } = UseLocations()
  const { getAuthors } = UseAuthors()
  const authors: AuthorOption[] | undefined = getAuthors()

  useEffect(() => {
    const currentFilter: Filter = {
      title: watch.title,
      author: watch.author,
      location: watch.location,
      category: watch.category,
      date: watch.date,
      eventType: watch.eventType ? watch.eventType : 'upcoming', //TODO to delete
    }
    setFilter(currentFilter)
  }, [watch.title, watch.author, watch.location, watch.category, watch.date, watch.eventType, setFilter])

  return (
    <form onSubmit={submitHandler}>
      <Row gutter={[16, 32]}>
        <Col span={24}>
          <InputField<Filter>
            placeholder="Название"
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
                controllerName="author"
                required={false}
                placeholder="Имя автора"
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
                placeholder="Название локации"
                options={getLocations()}
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
                placeholder="Название категории"
                options={getCategories()}
                label="Категория"
                className={styles.dropDownFilters}
                showSearch
              />
            </Col>
            <Col>
              <DateField<Filter>
                control={control}
                controllerName="date"
                required={false}
                label="Дата"
                placeholder="Выберите дату"
                className={styles.dropDownFilters}
              />
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
