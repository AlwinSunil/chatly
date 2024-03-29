import Fuse from "fuse.js"
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { doc, onSnapshot } from "firebase/firestore"
import { UserProfileContext } from "@context/UserProfileContext"
import Navigation from "@components/Navigation"
import NoContacts from "@components/NoContacts"
import { firestoreDB } from "~firebase"
import styles from "./NewMessage.module.scss"

function NewMessage() {
    const [activeUsers, setActiveUsers] = useState()
    const [searchDoc, setSearchDoc] = useState("")
    const [searchResult, setSearchResult] = useState()
    const [userProfileData] = useContext(UserProfileContext)

    useEffect(() => {
        onSnapshot(doc(firestoreDB, "data", "activeUsers"), (doc) => {
            setActiveUsers(doc.data().profiles)
            console.log(doc.data().profiles)
        })
    }, [])

    useEffect(() => {
        if (searchDoc == "") {
            setSearchResult()
        } else {
            if (activeUsers) {
                const fuse = new Fuse(activeUsers, {
                    keys: ["email"],
                })
                const result = fuse.search(searchDoc)
                for (let index = 0; index < result.length; index++) {
                    if (result[index].item.email === userProfileData.email) {
                        delete result[index]
                    }
                }
                setSearchResult(result)
            }
        }
    }, [searchDoc])

    const handleChange = (event) => {
        setSearchDoc(event.target.value)
    }

    return (
        <>
            <Navigation header="New message" />
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    value={searchDoc}
                    onChange={handleChange}
                    placeholder="Search email"
                />
                <div className={styles.search}>
                    <img src="/assets/icons/search.svg" alt="" />
                </div>
            </form>
            <div className={styles.results}>
                {searchResult ? (
                    <>
                        {searchResult.map((userData) => (
                            <Link
                                className={styles.chat}
                                key={userData.item.uid}
                                to={`/newchat=${userData.item.uid}`}
                            >
                                <img
                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${userData.item.name}`}
                                    alt=""
                                />
                                <div className={styles.info}>
                                    <p>{userData.item.name}</p>
                                    <div>{userData.item.email}</div>
                                </div>
                            </Link>
                        ))}
                    </>
                ) : (
                    <NoContacts />
                )}
            </div>
        </>
    )
}

export default NewMessage
