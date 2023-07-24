import React from "react"
import Navigation from "@components/Navigation"
import styles from "./About.module.scss"

function About() {
    return (
        <>
            <Navigation header="About" />
            <div className={styles.about}>
                <div className={styles.header}>
                    <img src="/assets/icons/logo.svg" alt="" />
                    <span className={styles.wordmark}>Chatly</span>
                    <p>v 1.0.0</p>
                </div>
                <div className={styles.details}>
                    <a
                        className={`${styles.button} menu`}
                        href="http://gihub.com/AlwinSunil/chatly"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p>
                            Github repo
                            <span>github.com/AlwinSunil/chatly</span>
                        </p>
                    </a>
                    <p className={styles.author}>
                        Project by:&nbsp;
                        <a
                            href="http://gihub.com/AlwinSunil"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Alwin Sunil
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default About
