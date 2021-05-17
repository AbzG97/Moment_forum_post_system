import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    // apiKey: "AIzaSyBRz8ANrPFWXfV7PVo6I_2EhQzkZCKabxE",
    // authDomain: "react-auth-system-test.firebaseapp.com",
    // projectId: "react-auth-system-test",
    // storageBucket: "react-auth-system-test.appspot.com",
    // messagingSenderId: "879063997061",
    // appId: "1:879063997061:web:52e8a3783812e941c2e7ec"
    
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
})

export const auth = app.auth();
export default app;