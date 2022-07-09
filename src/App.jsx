import React from "react"
import Loading from "@components/Loading"
import GuestRoutes from "@routes/GuestRoutes"
import LoggedInRoutes from "@routes/LoggedInRoutes"
import styles from "./App.module.scss"
import AppContextHandling from "./AppContextHandling"
import useAppLogic from "./useAppLogic"

function App() {
    const {
        userProfileData,
        userChatSessions,
        setUserChatSessions,
        installDeferredPrompt,
        setInstallDeferredPrompt,
        isAppInstalled,
        userLoggedIn,
        userId,
    } = useAppLogic()

    if (userLoggedIn === true) {
        return (
            <div className={styles.app}>
                <AppContextHandling
                    data={{
                        userProfileData,
                        userChatSessions,
                        setUserChatSessions,
                        installDeferredPrompt,
                        setInstallDeferredPrompt,
                        isAppInstalled,
                        userLoggedIn,
                        userId,
                    }}
                >
                    <LoggedInRoutes />
                </AppContextHandling>
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
