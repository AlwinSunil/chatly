import React, { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { UserChatSessionsContext } from "./context/UserChatSessionsContext"
import { UserIdContext } from "./context/UserIdContext"
import { UserLoggedInContext } from "./context/UserLoggedInContext"
import { UserProfileContext } from "./context/UserProfileContext"
import Loading from "./components/Loading/Loading"
import GuestRoutes from "./routes/GuestRoutes"
import LoggedInRoutes from "./routes/LoggedInRoutes"
import { updateUserStatus } from "./firebase"
import styles from "./App.module.scss"

function App() {
    const [userLoggedIn, setUserLoggedIn] = useState()
    const [userProfileData, setUserProfileData] = useState()
    const [userChatSessions, setUserChatSessions] = useState()
    const [userId, setUserId] = useState()

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserLoggedIn(true)
                setUserProfileData([user.providerData[0], user.displayName])
                setUserId(user.uid)
                console.log("User found : " + user.uid)
                console.log(user)
            } else {
                console.log("No user found")
                setUserLoggedIn(false)
            }
        })
    }, [])

    useEffect(() => {
        if (userId) {
            updateUserStatus(userId)
        }
    }, [userId])

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
