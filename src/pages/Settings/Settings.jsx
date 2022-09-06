import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth"
import { AppInstalledContext } from "@context/AppInstalledContext"
import { InstallDeferredPromptContext } from "@context/InstallDeferredPromptContext"
import { UserProfileContext } from "@context/UserProfileContext"
import Navigation from "@components/Navigation"
import Modal from "@mui/material/Modal"
import styles from "./Settings.module.scss"

function Profile() {
    const [userProfileData] = useContext(UserProfileContext)
    const { installDeferredPrompt, setInstallDeferredPrompt } = useContext(
        InstallDeferredPromptContext
    )
    const [isAppInstalled] = useContext(AppInstalledContext)

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    // sign out user function
    const signOutUser = () => {
        const auth = getAuth()
        signOut(auth)
            .then(() => {})
            .catch((error) => {
                console.log(error)
            })
    }

    const handleInstallPWA = async () => {
        installDeferredPrompt.prompt()
        const { outcome } = await installDeferredPrompt.userChoice
        console.log(`User response to the install prompt: ${outcome}`)
        setInstallDeferredPrompt(null)
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
                                    src={`https://avatars.dicebear.com/api/initials/${userProfileData.displayName}.svg`}
                                    alt=""
                                />
                            </div>
                            <div className={styles.details}>
                                <h3>{userProfileData.displayName}</h3>
                                <p>{userProfileData.email}</p>
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
                {installDeferredPrompt && (
                    <>
                        {!isAppInstalled && (
                            <div className={styles.settings}>
                                <div
                                    className={`${styles.settingsBtn} menu`}
                                    onClick={handleInstallPWA}
                                >
                                    <p>Install App</p>
                                </div>
                            </div>
                        )}
                    </>
                )}
                <div className={styles.querycall} onClick={handleOpen}>
                    <img src="/assets/icons/info.svg" alt="" />
                    <p>Messages are not encrypted.</p>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    height: "100vh",
                    display: "flex",
                }}
            >
                <div className={styles.modal}>
                    <img src="/assets/icons/info.svg" alt="" />
                    <p>
                        This app is part of my web development portfolio. Chatly
                        is currently in beta and messages are not encrypted.
                    </p>
                </div>
            </Modal>
        </>
    )
}

export default Profile
