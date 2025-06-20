import { Navigate, Outlet } from "react-router"
import { UserContext } from "./user-context"
import { useContext } from "react"
import { AUTH_URL } from "./constants"

export const AuthProtected = () => {
    const { user } = useContext(UserContext)

    if (user === null) {
        return <Navigate to={AUTH_URL} replace />
    }
    return <Outlet />
}