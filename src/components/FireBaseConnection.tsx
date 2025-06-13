import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD3tZYacukiKB21XAxIOLo4I9YAWdDKyYY",
    authDomain: "event-booking-f9f02.firebaseapp.com",
    databaseURL: "https://event-booking-f9f02-default-rtdb.firebaseio.com",
    projectId: "event-booking-f9f02",
    storageBucket: "event-booking-f9f02.firebasestorage.app",
    messagingSenderId: "991799312567",
    appId: "1:991799312567:web:209daf0a8f6b42f4b44d32",
    measurementId: "G-R4NTLG7GN8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const firestore = getFirestore(app)