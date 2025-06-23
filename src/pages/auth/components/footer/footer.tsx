import styles from './footer.module.css'
import { Typography } from 'antd'

const {Text} = Typography

type FooterProps = {
    text: string,
    subText: string,
    onClick: () => void
}

export const Footer = ({text, subText, onClick}:FooterProps) => {
    return (
        <Text className={styles.authorisationMethodText}>
            {text + ' '}
            <button
                onClick={onClick}
                className={styles.authorisationMethodButton}
            >
                <b>
                    {subText}
                </b>
            </button>
        </Text>
    )
}