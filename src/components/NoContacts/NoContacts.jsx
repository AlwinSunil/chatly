import React from "react"
import styles from "./NoContacts.module.scss"

function NoContacts() {
    return (
        <div className={styles.nocontacts}>
            <div className={styles.container}>
                <img src="https://img.icons8.com/fluency/96/000000/search-chat.png" />{" "}
                <p>
                    Search the username or email <br />
                    to send message
                </p>
            </div>
        </div>
    )
}

export default NoContacts
