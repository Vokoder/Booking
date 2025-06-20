import { Typography } from 'antd'
import styles from './styles.module.css'

const { Title, Text } = Typography

const SignUpHeader = () => {
    return <>
        <Title
            level={4}
            className={styles.header}
        >
            Добро пожаловать!
        </Title>
        <Text
            type='secondary'
            className={styles.header}
        >
            Пожалуйста, пройдите регистрацию
        </Text>
    </>
}

export default SignUpHeader