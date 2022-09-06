import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserChatSessionsContext } from "@context/UserChatSessionsContext"
import { UserIdContext } from "@context/UserIdContext"
import Loading from "@components/Loading"
import styles from "./Chats.module.scss"

function Chats() {
    const { userChatSessions } = useContext(UserChatSessionsContext)
    const [userId] = useContext(UserIdContext)

    return (
        <div className={styles.chats}>
            {userId && (
                <>
                    {userChatSessions ? (
                        <>
                            {userChatSessions.sessions.length === 0 && (
                                <div className={styles.prompt}>
                                    <img src="/assets/icons/no-chat.webp" />
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
                                                src={`https://avatars.dicebear.com/api/initials/${session.receiver.name}.svg`}
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
                                                src={`https://avatars.dicebear.com/api/initials/${session.initial.name}.svg`}
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
                    ) : (
                        <Loading
                            child={<p>Please wait. Setting your account</p>}
                        />
                    )}
                </>
            )}
        </div>
    )
}

export default Chats
