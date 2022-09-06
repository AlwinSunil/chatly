import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserProfileContext } from "@context/UserProfileContext"
import styles from "./Header.module.scss"

function Header() {
    const [userProfileData] = useContext(UserProfileContext)

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
                            src={`https://avatars.dicebear.com/api/initials/${userProfileData.displayName}.svg`}
                            alt=""
                        />
                    </Link>
                ) : (
                    <Link to="/settings">
                        <img
                            src={`https://avatars.dicebear.com/api/initials/users.svg`}
                            alt=""
                        />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Header
