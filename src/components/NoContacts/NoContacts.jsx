import React from "react"
import styles from "./NoContacts.module.scss"

function NoContacts() {
    return (
        <div className={styles.nocontacts}>
            <div className={styles.container}>
                <p>
                    Search the username or email <br />
                    to send message
                </p>
            </div>
        </div>
    )
}

export default NoContacts
