import { useState, type ReactNode } from "react";
import { AlertContext } from "./alert-message-context";
import type { AlertType } from "../components/alert-message.types";

export const AlertContextProvider = ({ children }: { children: ReactNode }) => {
    const [alert, setAlert] = useState<AlertType | null>(null)
    const value = {
        alert: alert,
        setAlert: setAlert,
    }

    return (
        <AlertContext.Provider value={value}>
            {children}
        </AlertContext.Provider>
    )
}