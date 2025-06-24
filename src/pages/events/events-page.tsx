import { useUser } from '@/app/auth/use-user'
import { useContext } from 'react'
import { UserContext } from '@/app/auth/user-context'

export const EventsPage = () => {
  const { logOut } = useUser()
  const { user } = useContext(UserContext)
  console.log(user?.uid)

  return (
    <>
      <h1>protected</h1>
      <p>
        UID: {user?.uid}
        <br />
        FirstName: {user?.firstName}
        <br />
        AboutMe: {user?.aboutMe}
        <br />
        Email: {user?.email}
      </p>
      <button onClick={logOut}>выйти</button>
    </>
  )
}
