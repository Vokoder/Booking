import { createContext } from 'react'
import { type AlertType } from '../components/alert-message.types'

type AlertContextType = {
  alert: AlertType | null
  setAlert: (alert: AlertType | null) => void
}

export const AlertContext = createContext<AlertContextType>({
  alert: null,
  setAlert: () => undefined,
})
