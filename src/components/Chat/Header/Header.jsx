import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { onValue, ref } from "firebase/database"
import { realtimeDB } from "~firebase"
import styles from "./Header.module.scss"

function Header(props) {
    const toProfileDetails = props.messageTo

    let navigate = useNavigate()

    const [userStatus, setUserStatus] = useState()

    useEffect(() => {
        if (toProfileDetails) {
            const lastSeenRef = ref(
                realtimeDB,
                "/status/" + toProfileDetails.uid
            )
            onValue(lastSeenRef, (snapshot) => {
                const data = snapshot.val()
                console.log(data)
                setUserStatus(data)
            })
        }
    }, [toProfileDetails])

    return (
        <div className={styles.header}>
            <div className={`btn ${styles.back}`} onClick={() => navigate("/")}>
                <img src="/assets/icons/back.svg" alt="" />
            </div>
            {toProfileDetails && (
                <>
                    <Link
                        className={styles.userprofile}
                        to={`/user=${toProfileDetails.uid}`}
                    >
                        {userStatus && (
                            <>
                                {userStatus.state === "online" ? (
                                    <>
                                        <div
                                            className={`${styles.profile} ${styles.online}`}
                                        >
                                            <img
                                                src={`https://avatars.dicebear.com/api/bottts/${toProfileDetails.name}.svg`}
                                                alt=""
                                            />
                                        </div>
                                        <div className={styles.user}>
                                            <span>{toProfileDetails.name}</span>
                                            <p>{userStatus.state}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className={`${styles.profile} ${styles.profile}`}
                                        >
                                            <img
                                                src={`https://avatars.dicebear.com/api/bottts/${toProfileDetails.name}.svg`}
                                                alt=""
                                            />
                                        </div>
                                        <div className={styles.user}>
                                            <span>{toProfileDetails.name}</span>
                                            {userStatus && (
                                                <p>{userStatus.state}</p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </Link>
                    <Link
                        to={`/voice=${toProfileDetails.uid}`}
                        className={`btn ${styles.back}`}
                    >
                        <img src="/assets/icons/call.svg" alt="" />
                    </Link>
                </>
            )}
        </div>
    )
}

export default Header
