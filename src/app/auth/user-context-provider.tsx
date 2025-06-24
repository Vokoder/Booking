import { type ReactNode, useState } from 'react'
import { type UserData } from '@api/user'
import { UserContext } from '@app/auth'

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null)
  const value = {
    user: user,
    setUser: setUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
