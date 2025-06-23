import { useContext } from "react";
import { UserContext } from "@/app/auth";
import type { UserData } from "@api/user";

export const useUser = () => {
    const { setUser } = useContext(UserContext)

    const logOut = () => {
        setUser(null)
    }

    const logIn = (user: UserData) => {
        setUser(user)
    }
    
    return { logIn, logOut }
}