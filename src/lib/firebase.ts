// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Make sure you add these to .env.local
const firebaseConfig = {
  apiKey: "AIzaSyAG4_a-soOgFq5Hk7yMmiVbeHSSxVdpkmc",
  authDomain: "career-sathi-bot.firebaseapp.com",
  projectId: "career-sathi-bot",
  storageBucket: "career-sathi-bot.firebasestorage.app",
  messagingSenderId: "131929273763",
  appId: "1:131929273763:web:ca5f609564cbb8b0169616",
  measurementId: "G-M958F5SJH6",
};

// Reuse app if already initialized (important for Next.js hot reload)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
