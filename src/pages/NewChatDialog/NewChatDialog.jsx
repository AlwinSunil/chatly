import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Modal } from "@mui/material"
import styles from "./NewChatDialog.module.scss"

function NewChatDialog() {
    let { uid } = useParams()

    let navigate = useNavigate()

    const [open, setOpen] = useState(true)

    const handleClose = () => setOpen(false)

    useEffect(() => {
        if (open === false) {
            navigate(-1)
        }
    }, [open])

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
                            src={`https://ui-avatars.com/api/?name=Alwin&background=random&color=random`}
                            alt=""
                        />
                        <h4>Alwin</h4>
                        <p>alv12alwin@gmail.com</p>
                    </div>
                    <div className={styles.action}>
                        <button className={styles.action_accent}>
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
