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
                let newMessageDoc = []
                let messagePayloadType

                if (isMessageDocLink(messageDoc) === true) {
                    contentPayload = {
                        type: "link/standalone",
                        payload: `${messageDoc}`,
                    }
                } else {
                    let refMessageDoc = messageDoc.split(" ")

                    for (let i = 0; i < refMessageDoc.length; i++) {
                        if (validator.isURL(refMessageDoc[i])) {
                            newMessageDoc.push({
                                type: "link",
                                content: refMessageDoc[i],
                            })
                        } else {
                            newMessageDoc.push({
                                type: "word",
                                content: refMessageDoc[i],
                            })
                        }
                    }

                    for (let i = 0; i < newMessageDoc.length; i++) {
                        if (newMessageDoc[i].type === "link") {
                            messagePayloadType = "text/link"
                        }
                    }

                    let textMessageDoc = []
                    if (messagePayloadType !== "text/link") {
                        for (let i = 0; i < newMessageDoc.length; i++) {
                            textMessageDoc.push(newMessageDoc[i].content)
                        }
                        textMessageDoc = textMessageDoc.join(" ")
                    }
                    if (messagePayloadType !== "text/link") {
                        contentPayload = {
                            type: "text/standalone",
                            payload: textMessageDoc,
                        }
                    } else {
                        contentPayload = {
                            type: `${messagePayloadType}`,
                            payload: newMessageDoc,
                        }
                    }
                }

                const data = {
                    message: contentPayload,
                    metadata: JSON.stringify(metatime()),
                    user: userId,
                }

                console.log(data)
                const messagePayload = data

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
