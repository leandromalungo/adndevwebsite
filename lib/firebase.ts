// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV7sMspG64OqmvwHpcDdflqjrB9jkDcso",
  authDomain: "adndev-5a2b0.firebaseapp.com",
  projectId: "adndev-5a2b0",
  storageBucket: "adndev-5a2b0.firebasestorage.app",
  messagingSenderId: "762909647613",
  appId: "1:762909647613:web:a7524e960e2bb85983d494",
  measurementId: "G-N02HBKKH01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);