import { useContext } from "react";
import type { AlertType } from "./alert-message.types";
import { AlertContext } from "../context/alert-message-context";

export const useAlert = () => {
    const { setAlert } = useContext(AlertContext)

    const showAlert = (data: AlertType) => {
        setAlert(data)
    }

    const hideAlert = () => {
        setAlert(null)
    }

    return { showAlert, hideAlert }
}