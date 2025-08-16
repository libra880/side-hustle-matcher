import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBzjjlDgtCX6wBEUcuUx2RQKODp96hqmf8",
    authDomain: "hustle-and-go.firebaseapp.com",
    projectId: "hustle-and-go",
    storageBucket: "hustle-and-go.firebasestorage.app",
    messagingSenderId: "700776961031",
    appId: "1:700776961031:web:0143d911fedbce6d2346a2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
