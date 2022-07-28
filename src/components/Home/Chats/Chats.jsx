import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserChatSessionsContext } from "@context/UserChatSessionsContext"
import { UserIdContext } from "@context/UserIdContext"
import styles from "./Chats.module.scss"

function Chats() {
    const { userChatSessions } = useContext(UserChatSessionsContext)
    const [userId] = useContext(UserIdContext)

    return (
        <div className={styles.chats}>
            {userId && (
                <>
                    {userChatSessions && (
                        <>
                            {userChatSessions.sessions.length === 0 && (
                                <div className={styles.prompt}>
                                    <img src="https://img.icons8.com/fluency/96/000000/no-chat.png" />{" "}
                                    <span>No chats yet.</span>
                                    <span>
                                        Get started by messaging a friend
                                    </span>
                                </div>
                            )}
                            {userChatSessions.sessions.map((session) => {
                                if (session.initial.uid == userId) {
                                    return (
                                        <Link
                                            className={styles.chat}
                                            to={`session=${session.id}`}
                                            key={session.id}
                                        >
                                            <img
                                                src={`https://avatars.dicebear.com/api/bottts/${session.receiver.name}.svg`}
                                                alt=""
                                            />
                                            <div className={styles.info}>
                                                <p>{session.receiver.name}</p>
                                                <div>
                                                    {session.receiver.email}
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                } else if (session.initial.uid != userId) {
                                    return (
                                        <Link
                                            className={styles.chat}
                                            to={`session=${session.id}`}
                                            key={session.id}
                                        >
                                            <img
                                                src={`https://avatars.dicebear.com/api/bottts/${session.initial.name}.svg`}
                                                alt=""
                                            />
                                            <div className={styles.info}>
                                                <p>{session.initial.name}</p>
                                                <div>
                                                    {session.initial.email}
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }
                            })}
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default Chats
