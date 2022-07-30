import React from "react"
import Navigation from "@components/Navigation"
import defaultStyles from "../../App.module.scss"
import styles from "./Maintenance.module.scss"

function Maintenance() {
    return (
        <div className={defaultStyles.app}>
            <Navigation />
            <div className={styles.progress}>
                <h2>Hey! Chatly is Under Maintenance.</h2>
                <p>
                    Currently, chatly is under maintenance or temporarily down.
                    Get a notification when chatly is back up.
                </p>
                <div className={styles.img}>
                    <img src="/assets/img/maintenance.webp" alt="" />
                </div>
                <div className={styles.action}>
                    <span className={styles.action_accent}>Notify me</span>

                    <a
                        href="https://alwinsunil.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.action_back}
                    >
                        Check my portfolio
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Maintenance
