import React, { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import "../auth.scss"

function GuestRoutes() {
    useEffect(() => {
        document.getElementById("root").firstChild.style["boxShadow"] = "none"
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default GuestRoutes
