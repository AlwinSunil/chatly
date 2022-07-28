import React from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./Header.module.scss"

function Header(props) {
    const toProfileDetails = props.messageTo

    let navigate = useNavigate()

    return (
        <div className={styles.header}>
            <div className={`btn ${styles.back}`} onClick={() => navigate("/")}>
                <img src="/assets/icons/back.svg" alt="" />
            </div>
            {toProfileDetails && (
                <Link
                    className={styles.userprofile}
                    to={`/user=${toProfileDetails.uid}`}
                >
                    <div className={styles.profile}>
                        <img
                            src={`https://avatars.dicebear.com/api/bottts/${toProfileDetails.name}.svg`}
                            alt=""
                        />
                    </div>
                    <div className={styles.user}>{toProfileDetails.name}</div>
                </Link>
            )}
        </div>
    )
}

export default Header
