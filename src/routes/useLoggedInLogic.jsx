import React, { useContext, useEffect } from "react"
import { doc, onSnapshot, setDoc } from "firebase/firestore"
import { UserChatSessionsContext } from "../context/UserChatSessionsContext"
import { UserIdContext } from "../context/UserIdContext"
import { UserProfileContext } from "../context/UserProfileContext"
import { firestoreDB } from "../firebase"

const useLoggedInLogic = () => {
    const { setUserChatSessions } = useContext(UserChatSessionsContext)
    const [userProfileData] = useContext(UserProfileContext)
    const [userId] = useContext(UserIdContext)

    useEffect(() => {
        document.getElementById("root").firstChild.style["boxShadow"] =
            "var(--shadow-app)"

        if (userId && userProfileData) {
            const userDocRef = doc(firestoreDB, "users", userId)

            const newUserData = {
                profile: {
                    email: `${userProfileData.email}`,
                    name: `${userProfileData.displayName}`,
                    uid: `${userProfileData.uid}`,
                },
                sessions: [],
            }

            onSnapshot(userDocRef, (doc) => {
                setUserChatSessions(doc.data())
                console.log("User sessions : ", doc.data())
                if (doc.data() == null) {
                    setDoc(userDocRef, newUserData)
                }
            })
        }

        document.title = "Chatly"
    }, [userProfileData, userId])
}

export default useLoggedInLogic
