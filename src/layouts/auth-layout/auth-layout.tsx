import styles from './auth-layout.module.css'
import { Row, Col } from 'antd'
import { type PropsWithChildren, type ReactNode } from 'react'
import { AlertContext } from '@/app/alert'
import { useContext } from 'react'
import { AlertMessage } from '@/app/alert'

type AuthLayoutProps = {
  footer: ReactNode
}

export const AuthLayout = ({ footer, children }: PropsWithChildren<AuthLayoutProps>) => {
  const { alert } = useContext(AlertContext)
  return (
    <>
      <Row justify="center" align="middle" className={styles.registrationPageBg}>
        <Col xs={{ span: 22 }} sm={{ span: 16 }} md={{ span: 12 }} lg={{ span: 10 }} xl={{ span: 8 }} xxl={{ span: 7 }}>
          <Row className={styles.formBg}>
            <Col span={24}>{children}</Col>
            <Col span={24}>
              <Row justify="center" align="middle">
                {footer}
              </Row>
            </Col>
          </Row>
        </Col>
        {alert && <AlertMessage />}
      </Row>
    </>
  )
}
