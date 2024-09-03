import { Profiler, createContext, useEffect, useState } from "react";
import { auth, db } from "../../fireBaseConfig";
import {signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const UserContext = createContext();

export const UserContextProvider = ( {children} ) => {

    const [user, setUser] = useState({});


    const googleSingIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }


    useEffect (() => {
        const unsuscribe = onAuthStateChanged(auth, (currentuser) => {
            console.log(currentuser);
            setUser(currentuser);
        })
        return () => {
            unsuscribe(); 
        }
    }, [])


    let data = {
        user,
        setUser,
        googleSingIn,
        logOut,
    }

    return (
        <UserContext.Provider value={ data }>
            {children}
        </UserContext.Provider>
    )
}
