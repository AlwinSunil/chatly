import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { doc, onSnapshot } from "firebase/firestore"
import Loading from "@components/HorizontalLoading"
import { firestoreDB } from "~firebase"
import styles from "./VoiceCall.module.scss"

function VoiceCall() {
    let { uid } = useParams()
    let navigate = useNavigate()

    const [receiverData, setReceiverData] = useState()

    useEffect(() => {
        onSnapshot(doc(firestoreDB, "users", uid), (doc) => {
            setReceiverData(doc.data().profile)
        })
    }, [])

    return (
        <>
            <div className={styles.voice}>
                <div className={styles.nav}>
                    <img
                        src="/assets/icons/expand.svg"
                        alt=""
                        onClick={() => navigate(-1)}
                    />
                    <p></p>
                </div>
                <div className={styles.profile}>
                    {receiverData ? (
                        <>
                            <img
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${receiverData.name}`}
                                alt=""
                            />
                            <h4>{receiverData.name}</h4>
                            <p>{receiverData.email}</p>
                        </>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </>
    )
}

export default VoiceCall
