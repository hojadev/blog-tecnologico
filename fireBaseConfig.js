import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId:import.meta.env.VITE_APPID,
};
//Get Auth


// Initialize Firebase
export const app = initializeApp( firebaseConfig );


//Google Auth
export const auth = getAuth(app);

//DB
export const db = getFirestore(app);

//Storage

const imgStorage = getStorage(app);

