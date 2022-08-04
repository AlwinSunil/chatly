import React from "react"
import { useParams } from "react-router-dom"
import Navigation from "@components/Navigation"

function UserProfile() {
    return (
        <>
            <Navigation />
            <div className={styles.user}></div>
        </>
    )
}

export default UserProfile
