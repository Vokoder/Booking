import { Typography } from 'antd'

const { Title, Text } = Typography

const RegistrationHeader = () => {
    return <div className="registration-header">
        <Title level={4} className="registration-header">Добро пожаловать!</Title>
        <Text type='secondary' className="registration-header">Пожалуйста, пройдите регистрацию</Text>
    </div>
}

export default RegistrationHeader