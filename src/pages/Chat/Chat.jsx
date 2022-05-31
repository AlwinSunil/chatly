import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, onSnapshot } from "firebase/firestore"
import { ChatMessagesContext } from "../../context/ChatMessagesContext"
import { UserIdContext } from "../../context/UserIdContext"
import Header from "../../components/Chat/Header"
import Input from "../../components/Chat/Input"
import Messages from "../../components/Chat/Messages"
import { db } from "../../firebase"
import styles from "./Chat.module.scss"

export default function Chat() {
    const [chatMessages, setChatMessages] = useState()
    const [toProfileDetails, setToProfileDetails] = useState()
    const [userId] = useContext(UserIdContext)

    let { id } = useParams()

    useEffect(() => {
        const messagesDialog = document.getElementById("messages__dialog")
        messagesDialog.scrollTop = messagesDialog.scrollHeight + 100
        console.log(userId)
        if (chatMessages) {
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
        onSnapshot(doc(db, "sessions", id), (doc) => {
            setChatMessages(doc.data())
        })
    }, [])

    return (
        <ChatMessagesContext.Provider value={{ chatMessages, setChatMessages }}>
            <div className={styles.chat}>
                <Header messageTo={toProfileDetails} />
                <Messages id={id} />
                <Input sessionId={id} />
            </div>
        </ChatMessagesContext.Provider>
    )
}
