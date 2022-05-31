import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth"
import { UserProfileContext } from "../../context/UserProfileContext"
import Navigation from "../../components/Navigation"
import styles from "./Settings.module.scss"

function Profile() {
    const [userProfileData] = useContext(UserProfileContext)

    // Sign out user function
    const signOutUser = () => {
        const auth = getAuth()
        signOut(auth)
            .then(() => {})
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <Navigation header="Settings" />
            <div className={styles.profile}>
                {userProfileData && (
                    <>
                        <div className={`${styles.card} menu`}>
                            <div className={styles.dp}>
                                <img
                                    src={`https://ui-avatars.com/api/?name=${userProfileData[1]}&background=random&color=random`}
                                    alt=""
                                />
                            </div>
                            <div className={styles.details}>
                                <h3>{userProfileData[1]}</h3>
                                <p>{userProfileData[0].email}</p>
                            </div>
                        </div>
                    </>
                )}
                <div className={`${styles.settings} ${styles.settingsFirst}`}>
                    <Link
                        className={`${styles.settingsBtn} menu`}
                        to="/updateprofile"
                    >
                        <p>Update Profile</p>
                    </Link>
                    <div
                        className={`${styles.settingsBtn} ${styles.settingsBtnLogout} menu`}
                        onClick={signOutUser}
                    >
                        <p>Log Out</p>
                    </div>
                </div>
                <div className={styles.settings}>
                    <Link className={`${styles.settingsBtn} menu`} to="/about">
                        <p>About</p>
                    </Link>
                    <div
                        className={`${styles.settingsBtn} ${styles.settingsBtnDisable} `}
                    >
                        <p className={styles.versionTitle}>Version</p>
                        <p className={styles.version}>1.0.0</p>
                    </div>
                </div>
                <div className={styles.settings}>
                    <div className={`${styles.settingsBtn} menu`}>
                        <p>Install App</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
