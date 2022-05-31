import React, { useContext, useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { doc, onSnapshot } from "firebase/firestore"
import { UserChatSessionsContext } from "../context/UserChatSessionsContext"
import { UserIdContext } from "../context/UserIdContext"
import { db } from "../firebase"
import Chat from "../pages/Chat"
import Home from "../pages/Home"
import NewMessage from "../pages/NewMessage"
import Settings from "../pages/Settings"
import UserProfile from "../pages/UserProfile"

function LoggedInRoutes() {
    const { setUserChatSessions } = useContext(UserChatSessionsContext)
    const [userId] = useContext(UserIdContext)

    useEffect(() => {
        document.getElementById("root").firstChild.style["boxShadow"] =
            "var(--shadow-app)"
        if (userId) {
            onSnapshot(doc(db, "users", userId), (doc) => {
                setUserChatSessions(doc.data())
            })
        }
        document.title = "Chatly"
    }, [userId])

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/newmessage" element={<NewMessage />} />
            <Route path="/session=:id" element={<Chat />} />
            <Route path="/user=:id" element={<UserProfile />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default LoggedInRoutes
