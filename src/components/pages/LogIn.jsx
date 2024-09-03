import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../fireBaseConfig.js";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css";


export const LogIn = () => {

    const navigate = useNavigate();
    const {user, googleSingIn} = useContext(UserContext);


    const getUserProfile = async (currentUser) => {
        console.log(currentUser);
        let userProfile = {
            displayName: currentUser.displayName,
            email: {
                address: currentUser.email,
                display: false,
            },
            photoURL: currentUser.photoURL,
            bio:"Hola! bienvenido a mi perfil 👋",
        };
    
        let userProfileCollection = collection(db, "userProfiles");
    
        const userProfileDocRef = doc(userProfileCollection, currentUser.uid);
    
        const userProfileSnapshot = await getDoc(userProfileDocRef);
    
        if (!userProfileSnapshot.exists()) {
            console.log("No existe");
            await setDoc(userProfileDocRef, userProfile);
        } else {
            console.log("Existe");
        }
    };




    const handleGoogleSingIn = async () => {
        try {
            await googleSingIn()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        if(user){
            getUserProfile(user);
            Toastify({
                text: `Bienvenido ${user.displayName} !`,
                duration: 2000,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }}).showToast();
            navigate("/");
        }
    }, [user])

    return (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center text-black">
            <h1 className="text-[#9290C3] text-7xl mb-12 font-bold ">Orbita</h1>
            <div className=" shadow w-[400px] h-[500px] rounded-xl flex flex-col gap-[80px] items-center">
                <h1 className="text-black text-3xl text-center mt-20 w-[300px] font-thin">Ingresa a tu cuenta</h1>
                <button onClick={handleGoogleSingIn}
                className=" bg-[#9290C3] border border-grey text-black w-[350px] h-[50px] rounded-2xl flex flex-row justify-around items-center hover:scale-105 duration-100 hover:shadow-md">
                    <img src="google.svg" className="w-[30px]"></img>
                    <p className="text-white text-center text-xl">Sign in With Google</p>
                </button>
            </div>

        </div>
    )
}
