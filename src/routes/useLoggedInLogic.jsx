import React, { useContext, useEffect } from "react"
import {
    arrayUnion,
    doc,
    onSnapshot,
    setDoc,
    updateDoc,
} from "firebase/firestore"
import { UserChatSessionsContext } from "@context/UserChatSessionsContext"
import { UserIdContext } from "@context/UserIdContext"
import { UserProfileContext } from "@context/UserProfileContext"
import { firestoreDB } from "~firebase"

const useLoggedInLogic = () => {
    const { setUserChatSessions } = useContext(UserChatSessionsContext)
    const [userProfileData] = useContext(UserProfileContext)
    const [userId] = useContext(UserIdContext)

    const newActiveUser = async () => {
        const activeUserDocRef = doc(firestoreDB, "data", "activeUsers")
        await updateDoc(activeUserDocRef, {
            profiles: arrayUnion({
                email: `${userProfileData.email}`,
                name: `${userProfileData.displayName}`,
                uid: `${userProfileData.uid}`,
            }),
        })
    }

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
                console.log("User sessions : ", doc.data())
                setUserChatSessions(doc.data())
                if (doc.data() == null) {
                    const unsubVerifyDoc = onSnapshot(userDocRef, (res) => {
                        setUserChatSessions(res.data())
                        if (res.data() == null) {
                            setDoc(userDocRef, newUserData)
                            newActiveUser()
                        }
                    })
                    unsubVerifyDoc()
                }
            })
        }

        document.title = "Chatly"
    }, [userProfileData, userId])
}

export default useLoggedInLogic
