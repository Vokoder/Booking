import styles from "./alert.module.css"
import { AlertContext } from "./context/alert-message-context"
import { useContext } from "react"
import { Alert } from "antd"

export const AlertMessage = () => {
    const { alert, setAlert } = useContext(AlertContext)

    return (
        <div className={styles.alertContainer}>
            <Alert
                message={alert?.message}
                type={alert?.type}
                closable
                onClose={() => setAlert(null)}
            />
        </div>
    )
}