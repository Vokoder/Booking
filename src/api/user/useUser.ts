import { useContext } from "react";
import { UserContext } from "../../app/user-context";
import type { UserData } from "./user-types";

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