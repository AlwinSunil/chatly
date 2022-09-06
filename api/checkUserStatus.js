import { credential } from "firebase-admin"
import { initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { FieldValue, getFirestore } from "firebase-admin/firestore"
import { existingUser, newUserCreated, newUserErr } from "./ResponseModel"

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)

initializeApp({
    credential: credential.cert(serviceAccount),
    databaseURL: process.env.VITE_DATABASE_URL,
})

const db = getFirestore()

export default function handler(request, response) {
    let userProfile
    const { uid } = request.query

    const getData = async (uid) => {
        const doc = await db.collection("users").doc(uid).get()
        if (!doc.exists) {
            await getAuth()
                .getUser(uid)
                .then((userRecord) => {
                    userProfile = {
                        email: userRecord.email,
                        name: userRecord.displayName,
                        uid: userRecord.uid,
                    }
                })
                .catch((error) => {
                    newUserErr(error)
                })

            const userRef = db.collection("users").doc(uid)
            const activeUsersRef = db.collection("data").doc("activeUsers")

            await userRef
                .set({ profile: userProfile, sessions: [] })
                .catch((error) => {
                    newUserErr(error)
                })

            await activeUsersRef
                .update({
                    profiles: FieldValue.arrayUnion(userProfile),
                })
                .catch((error) => {
                    newUserErr(error)
                })
            response.json(newUserCreated(userProfile))
        } else {
            response.json(existingUser(uid))
        }
    }
    getData(uid)
}
