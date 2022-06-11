import React from "react"
import { ChatMessagesContext } from "../../context/ChatMessagesContext"
import Header from "../../components/Chat/Header"
import Input from "../../components/Chat/Input"
import Messages from "../../components/Chat/Messages"
import styles from "./Chat.module.scss"
import useChatLogic from "./useChatLogic"

export default function Chat() {
    const { chatMessages, setChatMessages, toProfileDetails, id } =
        useChatLogic()

    return (
        <ChatMessagesContext.Provider value={{ chatMessages, setChatMessages }}>
            <div className={styles.chat}>
                <Header messageTo={toProfileDetails} />
                <Messages />
                <Input sessionId={id} />
            </div>
        </ChatMessagesContext.Provider>
    )
}
