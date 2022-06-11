import React from "react"
import { UserChatSessionsContext } from "./context/UserChatSessionsContext"
import { UserIdContext } from "./context/UserIdContext"
import { UserLoggedInContext } from "./context/UserLoggedInContext"
import { UserProfileContext } from "./context/UserProfileContext"
import Loading from "./components/Loading/Loading"
import GuestRoutes from "./routes/GuestRoutes"
import LoggedInRoutes from "./routes/LoggedInRoutes"
import styles from "./App.module.scss"
import useAppLogic from "./useAppLogic"

function App() {
    const {
        userProfileData,
        userChatSessions,
        setUserChatSessions,
        userLoggedIn,
        userId,
    } = useAppLogic()

    if (userLoggedIn === true) {
        return (
            <div className={styles.app}>
                <UserProfileContext.Provider value={[userProfileData]}>
                    <UserChatSessionsContext.Provider
                        value={{ userChatSessions, setUserChatSessions }}
                    >
                        <UserLoggedInContext.Provider value={[userLoggedIn]}>
                            <UserIdContext.Provider value={[userId]}>
                                <LoggedInRoutes />
                            </UserIdContext.Provider>
                        </UserLoggedInContext.Provider>
                    </UserChatSessionsContext.Provider>
                </UserProfileContext.Provider>
            </div>
        )
    } else if (userLoggedIn === false) {
        return (
            <div className={styles.app}>
                <GuestRoutes />
            </div>
        )
    }

    return (
        <div className={styles.loading}>
            <Loading />
        </div>
    )
}

export default App
