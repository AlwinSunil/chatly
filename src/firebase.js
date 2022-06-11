// import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"
import {
    getDatabase,
    onDisconnect,
    onValue,
    ref,
    serverTimestamp,
    set,
} from "firebase/database"
import {
    arrayUnion,
    doc,
    getFirestore,
    onSnapshot,
    updateDoc,
} from "firebase/firestore"

// configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
}

// initialize firebase
const app = initializeApp(firebaseConfig)
getAnalytics(app)

export const realtimeDB = getDatabase(app)
export const firestoreDB = getFirestore(app)

// handle sending message
export async function sendMessage(data, sessionId) {
    const docRef = doc(firestoreDB, "sessions", sessionId)
    await updateDoc(docRef, {
        chat: arrayUnion(data),
    })
}

// retrieving user sessions
export async function getUserSessions(uid) {
    onSnapshot(doc(firestoreDB, "users", uid), (doc) => {
        return doc.data()
    })
}

// updating user status
export function updateUserStatus(uid) {
    var userStatusDatabaseRef = ref(realtimeDB, "/status/" + uid)

    var isOfflineForDatabase = {
        state: "offline",
        last_changed: serverTimestamp(),
    }

    var isOnlineForDatabase = {
        state: "online",
        last_changed: serverTimestamp(),
    }

    const status = ref(realtimeDB, ".info/connected")
    onValue(status, (snapshot) => {
        if (snapshot.val() == false) {
            return
        }
        onDisconnect(userStatusDatabaseRef)
            .set(isOfflineForDatabase)
            .then(() => {
                set(userStatusDatabaseRef, isOnlineForDatabase)
            })
    })
}
