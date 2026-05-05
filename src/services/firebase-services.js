import admin from "firebase-admin"
import {readFile, readFileSync } from "fs"

const serviceAccount = JSON.parse(
    readFileSync("./src/config/gestion-de-bd-firebase-adminsdk-fbsvc-66ec3fccf1.json", "utf8")
)

admin.initializeApp(
    {
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://gestion-de-bd.firebaseio.com'
    }
)

export const db = admin.firestore();