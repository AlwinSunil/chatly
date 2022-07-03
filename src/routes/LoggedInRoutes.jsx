import React from "react"
import { Route, Routes } from "react-router-dom"
import Chat from "@pages/Chat"
import Home from "@pages/Home"
import NewChatDialog from "@pages/NewChatDialog"
import NewMessage from "@pages/NewMessage"
import Settings from "@pages/Settings"
import UserProfile from "@pages/UserProfile"
import WorkInProgress from "@pages/WorkInProgress"
import useLoggedInLogic from "./useLoggedInLogic"

function LoggedInRoutes() {
    useLoggedInLogic()

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/newmessage" element={<NewMessage />} />
            <Route path="/newchat=:uid" element={<NewChatDialog />} />
            <Route path="/session=:id" element={<Chat />} />
            {/* <Route path="/user=:id" element={<UserProfile />} /> */}
            <Route path="/updateprofile" element={<WorkInProgress />} />
            <Route path="*" element={<WorkInProgress />} />
        </Routes>
    )
}

export default LoggedInRoutes
