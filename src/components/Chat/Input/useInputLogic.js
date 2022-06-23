import validator from "validator"
import React, { useContext, useState } from "react"
import { UserIdContext } from "@context/UserIdContext"
import { sendMessage } from "~firebase"

function useInputLogic(sessionId) {
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

                const messagePayload = JSON.parse(data)

                sendMessage(messagePayload, sessionId)
                setMessageDoc("")
            } else {
                setMessageDoc("")
            }
        }
    }

    return { handleSubmit, handleChange, messageDoc }
}

export default useInputLogic
