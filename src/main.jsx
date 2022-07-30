import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import Maintenance from "@pages/Maintenance"
import App from "./App"
import "./index.scss"

const container = document.getElementById("root")
const root = createRoot(container)

const MaintenanceCheck = () => {
    if (import.meta.env.VITE_MAINTENANCE === "true") {
        return <Maintenance />
    } else {
        return <App />
    }
}

root.render(
    <React.StrictMode>
        <Router>
            <MaintenanceCheck />
        </Router>
    </React.StrictMode>
)
