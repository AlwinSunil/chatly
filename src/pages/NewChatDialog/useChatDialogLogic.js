import Fuse from "fuse.js"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore"
import { UserChatSessionsContext } from "@context/UserChatSessionsContext"
import { UserProfileContext } from "@context/UserProfileContext"
import { firestoreDB } from "~firebase"

function useChatDialogLogic() {
    const { userChatSessions } = useContext(UserChatSessionsContext)
    const [userProfileData] = useContext(UserProfileContext)

    let { uid } = useParams()

    let navigate = useNavigate()

    const [open, setOpen] = useState(true)
    const [success, setSuccess] = useState()
    const [receiverData, setreceiverData] = useState()
    const [newSessionId, setNewSessionId] = useState()
    const [actionPrompt, setActionPrompt] = useState("Start chat")
    const [isNewChat, setIsNewChat] = useState(true)
    const [sessionId, setSessionId] = useState("")

    const handleClose = () => setOpen(false)

    useEffect(() => {
        onSnapshot(doc(firestoreDB, "users", uid), (doc) => {
            setreceiverData(doc.data().profile)
        })
    }, [])

    useEffect(() => {
        if (userChatSessions && receiverData) {
            const fuse = new Fuse(userChatSessions.sessions, {
                includeScore: true,
                keys: ["initail.email", "receiver.email"],
            })
            const res = fuse.search(receiverData.email)
            if (
                res[0].item.initial ||
                res[0].item.receiver === receiverData.email
            ) {
                setActionPrompt("Continue chat")
                setIsNewChat(false)
                setSessionId(res[0].item.id)
            }
        }
    }, [userChatSessions, receiverData])

    useEffect(() => {
        if (open === false) {
            navigate(-1)
        }
        if (success === true) {
            navigate("/")
        }
    }, [open, success])

    useEffect(() => {
        async function setNewSession() {
            if (newSessionId) {
                const newsessionPayload = {
                    id: `${newSessionId}`,
                    initial: {
                        email: `${userProfileData.email}`,
                        uid: `${userProfileData.uid}`,
                        name: `${userProfileData.displayName}`,
                    },
                    receiver: {
                        email: `${receiverData.email}`,
                        uid: `${receiverData.uid}`,
                        name: `${receiverData.name}`,
                    },
                }
                console.log(newsessionPayload)
                const initialRef = doc(
                    firestoreDB,
                    "users",
                    userProfileData.uid
                )
                await updateDoc(initialRef, {
                    sessions: arrayUnion(newsessionPayload),
                })
                const receiverRef = doc(firestoreDB, "users", receiverData.uid)
                await updateDoc(receiverRef, {
                    sessions: arrayUnion(newsessionPayload),
                })
                setSuccess(true)
            }
        }
        setNewSession()
    }, [newSessionId])

    const initiateNewSession = async () => {
        if (isNewChat === false) {
            navigate(`/session=${sessionId}`)
        } else {
            if (userProfileData && receiverData) {
                const sessionPayload = {
                    chat: [],
                    initial: {
                        email: `${userProfileData.email}`,
                        uid: `${userProfileData.uid}`,
                        name: `${userProfileData.displayName}`,
                    },
                    receiver: {
                        email: `${receiverData.email}`,
                        uid: `${receiverData.uid}`,
                        name: `${receiverData.name}`,
                    },
                }
                const docRef = await addDoc(
                    collection(firestoreDB, "sessions"),
                    sessionPayload
                )
                setNewSessionId(docRef.id)
            }
        }
    }

    return { open, handleClose, actionPrompt, receiverData, initiateNewSession }
}

export default useChatDialogLogic
