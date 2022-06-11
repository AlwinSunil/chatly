import React from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./Header.module.scss"

function Header(props) {
    const toProfileDetails = props.messageTo

    let navigate = useNavigate()

    return (
        <div className={styles.header}>
            <div className={`btn ${styles.back}`} onClick={() => navigate(-1)}>
                <span className="material-symbols-rounded">arrow_back</span>
            </div>
            {toProfileDetails && (
                <Link
                    className={styles.userprofile}
                    to={`/user=${toProfileDetails.uid}`}
                >
                    <div className={styles.profile}>
                        <img
                            src={`https://ui-avatars.com/api/?name=${toProfileDetails.name}&background=random&color=random`}
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
