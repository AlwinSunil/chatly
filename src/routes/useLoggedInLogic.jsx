import { useContext, useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { UserChatSessionsContext } from "@context/UserChatSessionsContext"
import { UserIdContext } from "@context/UserIdContext"
import { UserProfileContext } from "@context/UserProfileContext"
import { firestoreDB } from "~firebase"

const useLoggedInLogic = () => {
    const { setUserChatSessions } = useContext(UserChatSessionsContext)
    const [userProfileData] = useContext(UserProfileContext)
    const [userId] = useContext(UserIdContext)

    const [checkUserStatus, setCheckUserStatus] = useState()

    useEffect(() => {
        document.getElementById("root").firstChild.style["boxShadow"] =
            "var(--shadow-app)"

        if (userId && userProfileData) {
            const userDocRef = doc(firestoreDB, "users", userId)

            onSnapshot(userDocRef, (doc) => {
                console.log("User sessions : ", doc.data())
                setUserChatSessions(doc.data())
                if (!doc.exists()) {
                    fetch(
                        `${
                            import.meta.env.VITE_CHATLY_API
                        }/checkUserStatus?uid=${userId}`
                    ).then((res) => setCheckUserStatus(res.json()))
                }
            })
        }
        document.title = "Chatly"
        console.log(checkUserStatus)
    }, [userProfileData, userId])
}

export default useLoggedInLogic
