// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"
import {
    arrayUnion,
    doc,
    getFirestore,
    onSnapshot,
    updateDoc,
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
getAnalytics(app)

export const db = getFirestore(app)

// Handle Sending Message
export async function sendMessage(data, sessionId) {
    const docRef = doc(db, "sessions", sessionId)
    await updateDoc(docRef, {
        chat: arrayUnion(data),
    })
}

export async function getUserSessions(uid) {
    onSnapshot(doc(db, "users", uid), (doc) => {
        return doc.data()
    })
}
