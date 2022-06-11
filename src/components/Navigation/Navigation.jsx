import React from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Navigation.module.scss"

function Navigation(props) {
    let navigate = useNavigate()

    return (
        <div className={styles.navigation}>
            <div className={styles.container}>
                <div
                    className={`${styles.navigateback} btn`}
                    onClick={() => navigate(-1)}
                >
                    <img src="/assets/icons/back.svg" alt="" />
                </div>
                <div className={styles.header}>
                    <p>{props.header}</p>
                </div>
            </div>
        </div>
    )
}

export default Navigation
