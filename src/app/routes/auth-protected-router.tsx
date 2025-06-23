import { Navigate, Outlet } from "react-router"
import { UserContext } from "@app/auth"
import { useContext } from "react"
import { SIGN_IN_URL } from "@constants/routes"

export const AuthProtected = () => {
    const { user } = useContext(UserContext)

    if (user === null) {
        return <Navigate to={SIGN_IN_URL} replace />
    }
    return <Outlet />
}