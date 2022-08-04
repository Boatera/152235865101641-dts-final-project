import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDfQk6P0NFbxsF5ks-Qr0XpbMnMv8oMw4w",
    authDomain: "watchnime-dts-pair-23.firebaseapp.com",
    projectId: "watchnime-dts-pair-23",
    storageBucket: "watchnime-dts-pair-23.appspot.com",
    messagingSenderId: "1087988982908",
    appId: "1:1087988982908:web:55e2193543f4c85210d5f9"
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
