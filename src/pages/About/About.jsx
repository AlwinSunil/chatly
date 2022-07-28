import React from "react"
import Navigation from "@components/Navigation"
import styles from "./About.module.scss"

function About() {
    return (
        <div>
            <Navigation header="About" />
            <div className={styles.about}>
                <div className={styles.header}>
                    <div className={styles.branding}>
                        <img src="/assets/icons/logo.svg" alt="" />
                        <span className={styles.wordmark}>Chatly</span>
                        <p>v 1.0.0</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
