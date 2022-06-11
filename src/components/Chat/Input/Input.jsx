import React from "react"
import styles from "./Input.module.scss"
import useInputLogic from "./useInputLogic"

function Message(props) {
    const sessionId = props.sessionId

    const { handleSubmit, handleChange, messageDoc } = useInputLogic(sessionId)

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
