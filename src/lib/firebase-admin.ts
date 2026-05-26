import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";

let app: App;
let db: Firestore;
let storage: Storage;

function getAdminApp(): App {
    if (!app) {
        if (getApps().length === 0) {
            app = initializeApp({
                credential: cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    // Replace escaped newlines so the key works in .env.local
                    privateKey: (process.env.FIREBASE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
                }),
                storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            });
        } else {
            app = getApps()[0];
        }
    }
    return app;
}

export function adminDb(): Firestore {
    if (!db) db = getFirestore(getAdminApp());
    return db;
}

export function adminStorage(): Storage {
    if (!storage) storage = getStorage(getAdminApp());
    return storage;
}

export async function getAdminAccessToken(): Promise<string> {
    const credential = getAdminApp().options.credential;
    if (!credential) throw new Error("Firebase Admin credential not configured");
    const { access_token } = await credential.getAccessToken();
    return access_token;
}
