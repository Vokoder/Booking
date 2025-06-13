import '@/style/AuthScreen.css'
import '@/style/Form.css'
import { Row, Col } from "antd";
import RegistrationForm from './SignUpForm';

const RegisterScreen = () => {
    return (
        <>
            <Row
                justify='center'
                align='middle'
                className='registration-screen-bg'
            >
                <Col
                    xs={{ span: 22 }}
                    sm={{ span: 16 }}
                    md={{ span: 12 }}
                    lg={{ span: 10 }}
                    xl={{ span: 8 }}
                    xxl={{ span: 7 }}
                >
                    <Row className="form-bg">
                        <Col span={24}>
                            <RegistrationForm />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default RegisterScreen