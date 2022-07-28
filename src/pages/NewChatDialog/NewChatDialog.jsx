import React from "react"
import Loading from "@components/HorizontalLoading"
import { Modal } from "@mui/material"
import styles from "./NewChatDialog.module.scss"
import useChatDialogLogic from "./useChatDialogLogic"

function NewChatDialog() {
    const {
        open,
        handleClose,
        actionPrompt,
        receiverData,
        initiateNewSession,
    } = useChatDialogLogic()

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
                    <div className={styles.title}>{actionPrompt} with</div>
                    {receiverData ? (
                        <div className={styles.profile}>
                            <img
                                src={`https://avatars.dicebear.com/api/bottts/${receiverData.name}.svg`}
                                alt=""
                            />
                            <h4>{receiverData.name}</h4>
                            <p>{receiverData.email}</p>
                        </div>
                    ) : (
                        <Loading />
                    )}
                    <div className={styles.action}>
                        {receiverData ? (
                            <button
                                className={styles.action_accent}
                                onClick={initiateNewSession}
                            >
                                {actionPrompt}
                            </button>
                        ) : (
                            <button className={styles.action_accent} disabled>
                                Loading...
                            </button>
                        )}
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
