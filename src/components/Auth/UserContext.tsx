import { createContext, type ReactNode, useState } from 'react'
import { type IUserData } from './IUserDataType'

export const UserContext = createContext<any>('error')

const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [contextUser, setContextUser] = useState<IUserData>({
        'firstName': null,
        'aboutMe': null,
        'email': null,
    })

    return (
        <UserContext.Provider value={{ contextUser, setContextUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider