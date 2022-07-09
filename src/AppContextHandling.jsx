import React from "react"
import { AppInstalledContext } from "@context/AppInstalledContext"
import { InstallDeferredPromptContext } from "@context/InstallDeferredPromptContext"
import { UserChatSessionsContext } from "@context/UserChatSessionsContext"
import { UserIdContext } from "@context/UserIdContext"
import { UserLoggedInContext } from "@context/UserLoggedInContext"
import { UserProfileContext } from "@context/UserProfileContext"

function AppContextHandling({ children, data }) {
    let prompt = data.installDeferredPrompt
    let setPrompt = data.setInstallDeferredPrompt
    let chatSessions = data.userChatSessions
    let setChatSessions = data.setUserChatSessions

    return (
        <InstallDeferredPromptContext.Provider
            value={{
                installDeferredPrompt: prompt,
                setInstallDeferredPrompt: setPrompt,
            }}
        >
            <AppInstalledContext.Provider value={[data.isAppInstalled]}>
                <UserProfileContext.Provider value={[data.userProfileData]}>
                    <UserChatSessionsContext.Provider
                        value={{
                            userChatSessions: chatSessions,
                            setUserChatSessions: setChatSessions,
                        }}
                    >
                        <UserLoggedInContext.Provider
                            value={[data.userLoggedIn]}
                        >
                            <UserIdContext.Provider value={[data.userId]}>
                                {children}
                            </UserIdContext.Provider>
                        </UserLoggedInContext.Provider>
                    </UserChatSessionsContext.Provider>
                </UserProfileContext.Provider>
            </AppInstalledContext.Provider>
        </InstallDeferredPromptContext.Provider>
    )
}

export default AppContextHandling
