import { Button, Col, Dropdown, Row, Space, Tabs, type MenuProps, type TabsProps } from 'antd'
import styles from './events-page.module.css'
import { DownOutlined, LogoutOutlined } from '@ant-design/icons'
import { UserContext, useUser } from '@/app/auth'
import { EventsPageEvents, EventsPageProfile } from './components'
import { useContext } from 'react'
import { CategoryContextProvider, EventsContextProvider, LocationsContextProvider } from '@/app/events'
import { AuthorsContextProvider } from '@/app/events/authors-context'

export const EventsPage = () => {
  const { logOut } = useUser()
  const { user } = useContext(UserContext)

  const tabsItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Мероприятия',
      children: <EventsPageEvents />,
    },
    {
      key: '2',
      label: 'Профиль',
      children: <EventsPageProfile />,
    },
  ]

  const dropDownItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Выйти',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ]

  const dropDownMenu = {
    items: dropDownItems,
    onClick: logOut,
  }

  return (
    <CategoryContextProvider>
      <LocationsContextProvider>
        <EventsContextProvider>
          <AuthorsContextProvider>
            <Row className={styles.eventsPageBg}>
              <Col span={24}>
                <Tabs
                  defaultActiveKey="1"
                  items={tabsItems}
                  tabBarExtraContent={
                    <Dropdown menu={dropDownMenu}>
                      <Button>
                        <Space>
                          {user?.firstName}
                          <DownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                  }
                />
              </Col>
            </Row>
          </AuthorsContextProvider>
        </EventsContextProvider>
      </LocationsContextProvider>
    </CategoryContextProvider>
  )
}
