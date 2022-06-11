import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, onSnapshot } from "firebase/firestore"
import { UserIdContext } from "../../context/UserIdContext"
import { firestoreDB } from "../../firebase"

function useChatLogic() {
    const [chatMessages, setChatMessages] = useState()
    const [toProfileDetails, setToProfileDetails] = useState()
    const [userId] = useContext(UserIdContext)

    let { id } = useParams()

    useEffect(() => {
        const messagesDialog = document.getElementById("messages__dialog")
        messagesDialog.scrollTop = messagesDialog.scrollHeight + 100
        if (chatMessages && userId) {
            console.log(chatMessages)
            if (userId == chatMessages.initial.uid) {
                setToProfileDetails(chatMessages.recevier)
            } else {
                setToProfileDetails(chatMessages.initial)
            }
            console.log("Chat Initialised : ", chatMessages.initial)
            console.log("Initial recevier : ", chatMessages.recevier)
        }
    }, [userId, chatMessages])

    useEffect(() => {
        onSnapshot(doc(firestoreDB, "sessions", id), (doc) => {
            setChatMessages(doc.data())
        })
    }, [])

    return { chatMessages, setChatMessages, toProfileDetails, id }
}

export default useChatLogic
