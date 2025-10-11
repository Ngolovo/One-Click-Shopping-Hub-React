// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
// import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACQM-ZM2e0ZVz-gQR-B2B9tuHubDk8bTw",
  authDomain: "project-dca9d.firebaseapp.com",
  projectId: "project-dca9d",
  storageBucket: "project-dca9d.firebasestorage.app",
  messagingSenderId: "481539788425",
  appId: "1:481539788425:web:162823f5b8be7d28924058"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);