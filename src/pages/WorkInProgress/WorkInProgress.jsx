import React from "react"
import { Link } from "react-router-dom"
import Navigation from "@components/Navigation"
import styles from "./WorkInProgress.module.scss"

function WorkInProgress() {
    return (
        <>
            <Navigation />
            <div className={styles.progress}>
                <h2>Hey! Chatly is still in work in progress.</h2>
                <p>
                    Chatly is a personal project for my software portfolio. I
                    still working on this project.
                </p>
                <div className={styles.img}>
                    <img src="/assets/img/portfolio.webp" alt="" />
                </div>
                <div className={styles.action}>
                    <Link to="/" className={styles.action_accent}>
                        Go back to home
                    </Link>
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
        </>
    )
}

export default WorkInProgress
