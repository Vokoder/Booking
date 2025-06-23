import { createContext } from 'react'
import type { UserData } from '@api/user'

type AuthContextType = {
    user: UserData | null,
    setUser: (user: UserData | null) => void,
}

export const UserContext = createContext<AuthContextType>({
    user: null,
    setUser: () => undefined
})