import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const metaEnv = (import.meta as any).env || {};

// Read Firebase config from env if available
const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || "demo-app.firebaseapp.com",
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || "demo-app",
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || "demo-app.appspot.com",
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: metaEnv.VITE_FIREBASE_APP_ID || "1:1234567890:web:1234567890",
};

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
