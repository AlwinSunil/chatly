import React from "react"
import Chats from "@components/Home/Chats"
import Header from "@components/Home/Header"
import NewChatBtn from "@components/Home/NewChatBtn"
import styles from "./Home.module.scss"

function Home() {
    return (
        <div className={styles.home}>
            <Header />
            <Chats />
            <NewChatBtn />
        </div>
    )
}

export default Home
