import { Navigate, Outlet } from "react-router"
import { UserContext } from "@app/auth"
import { useContext } from "react"
import { DEFAULT_URL } from "@constants/routes"

export const GuestProtected = () => {
    const { user } = useContext(UserContext)

    if (user === null) {
        return <Outlet />
    }
    return <Navigate to={DEFAULT_URL} replace />
}