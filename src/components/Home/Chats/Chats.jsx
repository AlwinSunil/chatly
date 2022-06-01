import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserChatSessionsContext } from "../../../context/UserChatSessionsContext"
import { UserIdContext } from "../../../context/UserIdContext"
import styles from "./Chats.module.scss"

function Chats() {
    const { userChatSessions } = useContext(UserChatSessionsContext)
    const [userId] = useContext(UserIdContext)

    useEffect(() => {
        if (userChatSessions) {
            console.log("User sessions : ", userChatSessions)
        }
    }, [userChatSessions])

    return (
        <div className={styles.chats}>
            {userId && (
                <>
                    {userChatSessions && (
                        <>
                            {userChatSessions.sessions.map((session) => {
                                if (session.initial.uid == userId) {
                                    return (
                                        <Link
                                            className={styles.chat}
                                            to={`session=${session.id}`}
                                            key={session.id}
                                        >
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${session.receiver.name}&background=random&color=random`}
                                                alt=""
                                            />
                                            <div className={styles.info}>
                                                <p>{session.receiver.name}</p>
                                                <div>how u doing?</div>
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
                                                src={`https://ui-avatars.com/api/?name=${session.initial.name}&background=random&color=random`}
                                                alt=""
                                            />
                                            <div className={styles.info}>
                                                <p>{session.initial.name}</p>
                                                <div>how u doing?</div>
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
