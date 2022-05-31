import validator from "validator"
import React, { useContext, useState } from "react"
import { UserIdContext } from "../../../context/UserIdContext"
import { sendMessage } from "../../../firebase"
import styles from "./Input.module.scss"

function Message(props) {
    const sessionId = props.sessionId

    const [messageDoc, setMessageDoc] = useState("")
    const [userId] = useContext(UserIdContext)

    const handleChange = (event) => {
        setMessageDoc(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const metatime = () => {
            const d = new Date()
            return d.toString()
        }

        const checkOnlySpaces = (str) => {
            return str.trim().length === 0
        }

        const isMessageDocLink = (text) => {
            if (validator.isURL(text)) {
                return true
            } else {
                return false
            }
        }

        if (messageDoc !== "") {
            if (checkOnlySpaces(messageDoc) != true) {
                let contentPayload
                if (isMessageDocLink(messageDoc) === true) {
                    contentPayload = `<a href="${messageDoc}" target="_blank" rel="noopener noreferrer">${messageDoc}</a>`
                } else {
                    contentPayload = `${messageDoc}`
                }

                console.log(contentPayload)

                const data = `{"message": ${JSON.stringify(contentPayload)},
                "metadata": ${JSON.stringify(metatime())},
                "user":${JSON.stringify(userId)}}`

                // const data = `{"message": ${JSON.stringify(messageDoc)},
                // "metadata": ${JSON.stringify(metatime())},
                // "user":${JSON.stringify(userId)}}`

                const messagePayload = JSON.parse(data)

                sendMessage(messagePayload, sessionId)
                setMessageDoc("")
            } else {
                setMessageDoc("")
            }
        }
    }

    return (
        <div className={styles.container}>
            <form
                className={styles.input}
                onSubmit={handleSubmit}
                id="chatinput"
            >
                <input
                    type="text"
                    placeholder="Type in your message"
                    value={messageDoc}
                    onChange={handleChange}
                />
                {messageDoc != "" ? (
                    <button type="submit" onClick={handleSubmit}>
                        <img src="/assets/icons/send.svg" alt="" />
                    </button>
                ) : (
                    <button disabled>
                        <img src="/assets/icons/send-disabled.svg" alt="" />
                    </button>
                )}
            </form>
        </div>
    )
}

export default Message
