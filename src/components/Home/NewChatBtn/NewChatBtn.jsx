import React from "react"
import { Link } from "react-router-dom"
import styles from "./NewChatBtn.module.scss"

function NewChatBtn() {
    return (
        <Link className={styles.newmessage} to="/newmessage">
            <img src="/assets/icons/message-add.svg" alt="" />
        </Link>
    )
}

export default NewChatBtn
