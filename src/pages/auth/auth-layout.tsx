import styles from './auth-page.module.css'
import { Row, Col, Typography } from "antd";
import { useState } from 'react';
import * as constants from "./constants";
import { Outlet, useNavigate } from "react-router"
import * as navConstants from "../../app/constants"

const { Text } = Typography

interface AuthPageProps {
  startWithSignUp:boolean,
}

export const AuthLayout = (props:AuthPageProps) => {
  const [signUp, setSignUp] = useState(props.startWithSignUp)
  const navigate = useNavigate()

  const SwitchAuthMethod = () => {
    navigate(signUp?(navConstants.SIGN_IN_URL):(navConstants.SIGN_UP_URL))
    setSignUp(!signUp)
  }
  return (
    <>
      <Row
        justify='center'
        align='middle'
        className={styles.registrationPageBg}
      >
        <Col
          xs={{ span: 22 }}
          sm={{ span: 16 }}
          md={{ span: 12 }}
          lg={{ span: 10 }}
          xl={{ span: 8 }}
          xxl={{ span: 7 }}
        >
          <Row className={styles.formBg}>
            <Col span={24}>
              <Outlet />
            </Col>
            <Col span={24}>
              <Row justify="center" align="middle">
                <Text className={styles.authorisationMethodText}>
                  {signUp ? constants.USE_SIGN_IN_TEXT : constants.USE_SIGN_UP_TEXT}
                  {' '}
                  <button
                    onClick={SwitchAuthMethod}
                    className={styles.authorisationMethodButton}
                  >
                    <b>
                      {signUp ? constants.USE_SIGN_IN_BUTTON : constants.USE_SIGN_UP_BUTTON}
                    </b>
                  </button>
                </Text>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}