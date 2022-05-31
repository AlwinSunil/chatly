import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserProfileContext } from "../../../context/UserProfileContext"
import styles from "./Header.module.scss"

function Header() {
    const [userProfileData] = useContext(UserProfileContext)

    useEffect(() => {
        if (userProfileData) {
            console.log(userProfileData)
        }
    }, [userProfileData])

    return (
        <div className={styles.header}>
            <div className={styles.nav}>
                <div className={styles.logo}>
                    <img src="/assets/icons/logo.svg" alt="" />
                    <div className={styles.wordmark}>Chatly</div>
                </div>
                {userProfileData ? (
                    <Link to="/settings">
                        <img
                            src={`https://ui-avatars.com/api/?name=${userProfileData[1]}&background=random&color=random`}
                            alt=""
                        />
                    </Link>
                ) : (
                    <Link to="/settings">
                        <img
                            src={`https://ui-avatars.com/api/?name=User&background=random&color=random`}
                            alt=""
                        />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Header
