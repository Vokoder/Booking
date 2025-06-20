import { type ReactNode, useState } from 'react'
import { type UserData } from '../api/user/user-types'
import { UserContext } from './user-context'

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null)

  const value = {
    user: user,
    setUser: setUser,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}