import React, { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { updateUserStatus } from "~firebase"

function useAppLogic() {
    const [installDeferredPrompt, setInstallDeferredPrompt] = useState()
    const [userLoggedIn, setUserLoggedIn] = useState()
    const [userProfileData, setUserProfileData] = useState()
    const [userChatSessions, setUserChatSessions] = useState()
    const [userId, setUserId] = useState()

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            console.log(`'beforeinstallprompt' event was fired.`)
            setInstallDeferredPrompt(e)
            e.preventDefault()
        })
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const profileData = {
                    displayName: `${user.displayName}`,
                    email: `${user.email}`,
                    phoneNumber: `${user.phoneNumber}`,
                    photoURL: `${user.photoURL}`,
                    uid: `${user.uid}`,
                }
                setUserLoggedIn(true)
                setUserProfileData(profileData)
                setUserId(user.uid)
                console.log(user)
            } else {
                setUserLoggedIn(false)
            }
        })
    }, [])

    useEffect(() => {
        if (userId) {
            updateUserStatus(userId)
        }
    }, [userId])

    return {
        userProfileData,
        userChatSessions,
        setUserChatSessions,
        installDeferredPrompt,
        setInstallDeferredPrompt,
        userLoggedIn,
        userId,
    }
}

export default useAppLogic
