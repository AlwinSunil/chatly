import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore"
import { UserProfileContext } from "../../context/UserProfileContext"
import { Modal } from "@mui/material"
import { firestoreDB } from "../../firebase"
import styles from "./NewChatDialog.module.scss"

function NewChatDialog() {
    const [userProfileData] = useContext(UserProfileContext)

    let { uid } = useParams()

    let navigate = useNavigate()

    const [open, setOpen] = useState(true)
    const [success, setSuccess] = useState()
    const [receiverData, setreceiverData] = useState()
    const [newSessionId, setNewSessionId] = useState()

    const handleClose = () => setOpen(false)

    useEffect(() => {
        onSnapshot(doc(firestoreDB, "users", uid), (doc) => {
            setreceiverData(doc.data().profile)
        })
    }, [])

    useEffect(() => {
        if (open === false) {
            navigate(-1)
        }
        if (success === true) {
            navigate("/")
        }
        console.log(uid)
    }, [open, success])

    useEffect(async () => {
        if (newSessionId) {
            const newsessionPayload = {
                id: `${newSessionId}`,
                initial: {
                    email: `${userProfileData.email}`,
                    uid: `${userProfileData.uid}`,
                    name: `${userProfileData.displayName}`,
                },
                receiver: {
                    email: `${receiverData.email}`,
                    uid: `${receiverData.uid}`,
                    name: `${receiverData.name}`,
                },
            }
            console.log(newsessionPayload)
            const initialRef = doc(firestoreDB, "users", userProfileData.uid)
            await updateDoc(initialRef, {
                sessions: arrayUnion(newsessionPayload),
            })
            const receiverRef = doc(firestoreDB, "users", receiverData.uid)
            await updateDoc(receiverRef, {
                sessions: arrayUnion(newsessionPayload),
            })
            setSuccess(true)
        }
    }, [newSessionId])

    const initiateNewSession = async () => {
        if (userProfileData && receiverData) {
            const sessionPayload = {
                chat: [],
                initial: {
                    email: `${userProfileData.email}`,
                    uid: `${userProfileData.uid}`,
                    name: `${userProfileData.displayName}`,
                },
                receiver: {
                    email: `${receiverData.email}`,
                    uid: `${receiverData.uid}`,
                    name: `${receiverData.name}`,
                },
            }
            const docRef = await addDoc(
                collection(firestoreDB, "sessions"),
                sessionPayload
            )
            setNewSessionId(docRef.id)
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={styles.container}
            >
                <div className={styles.modal}>
                    <div className={styles.title}>Start conversation with</div>
                    <div className={styles.profile}>
                        <img
                            src={`https://ui-avatars.com/api/?name=Alwin&background=random`}
                            alt=""
                        />
                        <h4>Alwin</h4>
                        <p>alv12alwin@gmail.com</p>
                    </div>
                    <div className={styles.action}>
                        <button
                            className={styles.action_accent}
                            onClick={initiateNewSession}
                        >
                            Start conversation
                        </button>
                        <button
                            className={styles.action_back}
                            onClick={handleClose}
                        >
                            Go back
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default NewChatDialog
