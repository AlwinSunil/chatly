import React, { useContext } from "react"
import { ChatMessagesContext } from "../../../context/ChatMessagesContext"
import { UserIdContext } from "../../../context/UserIdContext"
import styles from "./Messages.module.scss"

function Messages() {
    const { chatMessages } = useContext(ChatMessagesContext)

    const [userId] = useContext(UserIdContext)

    return (
        <div className={styles.messages} id="messages__dialog">
            {chatMessages && userId && (
                <>
                    {chatMessages.chat.map((item, i) => {
                        if (item.user == userId) {
                            return (
                                <div className={styles.sender} key={i}>
                                    <div
                                        className={styles.sender__message}
                                        dangerouslySetInnerHTML={{
                                            __html: item.message,
                                        }}
                                    ></div>
                                </div>
                            )
                        } else if (item.user != userId) {
                            return (
                                <div className={styles.receiver} key={i}>
                                    <div
                                        className={styles.receiver__message}
                                        dangerouslySetInnerHTML={{
                                            __html: item.message,
                                        }}
                                    ></div>
                                </div>
                            )
                        }
                    })}
                </>
            )}
        </div>
    )
}

export default Messages
