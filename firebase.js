import admin from "firebase-admin";
import { readFileSync } from "fs";

// Use your Firebase service account JSON
const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "chatapp-bfd8d.appspot.com"  // <-- use appspot.com not firebasestorage.app
});

const bucket = admin.storage().bucket();

export { bucket };
