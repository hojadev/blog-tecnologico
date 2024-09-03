import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { UserContext } from "../../context/UserContext";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../fireBaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { ProfilePost } from "../commun/ProfilePost";
import { PostCard } from "../commun/PostCard";
import { LoadingProfile } from "../commun/LoadingProfile";


export const UserProfile = () => {
    const {id} = useParams();
    const {user} = useContext(UserContext)
    const [isAdmin, setIsAdmin] = useState(false);
    const [userProfile, setUserProfile] = useState({});
    const [userPost, setUserPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getAdmin = () => {
        if(userProfile.id === user.uid){
            setIsAdmin(true)
            console.log(isAdmin);
            console.log(user.uid);
        }
    }

    const getPostUser = async() => {

        let postCollectionRef = collection(db, "post");
        
        let qr = query(postCollectionRef, where("idAuthor", "==", id));
        const querySnapshot = await getDocs(qr);
        let post = [];
        querySnapshot.forEach((doc) => {
            post.push({ ...doc.data(), key:doc.id });
        });
        setUserPost(post);
        setIsLoading(false);
        console.log(post)
    }

    const getUserProfile = async() => {

        let userProfileCollection = collection(db, "userProfiles");
        const userProfileDocRef = doc(userProfileCollection, id);
    
        await getDoc(userProfileDocRef)
        .then( res => {
            setUserProfile({...res.data(),id: res.id});
        })
    }

    useEffect( () => {
            getUserProfile();
            const unsuscribe = onAuthStateChanged(auth, (currentuser) => {
                if(currentuser.uid === id){
                    setIsAdmin(true)
                    console.log(isAdmin);
                }else{
                    console.log(isAdmin);
                };
            })
            getPostUser();
            return () => {
                unsuscribe(); 
            }

    },[id,isAdmin] )

    if(isLoading){
        return <LoadingProfile/>
    }

    if(userProfile == null || id == 'undefined'){
        return(
            <h1>No se ha encontrado</h1>
        )
    }

    return (
        
        
        <div className="rounded-xl">
            <div className="md:w-[60%] m-auto rounded-lg mt-[50px] bg-color-primary ">
                <div className="flex flex-col lg:flex-row mt-4  justify-around items-center">

                    <div className="flex flex-col md:ml-6 mt-8 mb-8 justify-center items-center">
                        <h2 className="text-white text-3xl font-bold mb-4">{userProfile.displayName}</h2>
                        <img src={userProfile.photoURL} alt="" className="text-white w-[70%] rounded-full"/>
                    </div>
                    
                    <p className="text-white text-center mr-12 text-xl w-[200px] mb-8"> { userProfile.bio } </p>
                    {/* {
                        isAdmin && <h1>Admin</h1> 
                    } */}
                </div>
                <div className="bg-color-primary flex flex-col gap-4 py-5">
                    <h3 className="text-white text-center text-3xl font-bold">Publicaciones por {userProfile.displayName}</h3>
                    {
                        isLoading ?  (<h1>Loading...</h1>): ( 
                        userPost.map( (post) => {
                            console.log(post);
                            return <ProfilePost postContent={post} key={post.key} path={post.key}/>
                        } )
                        )
                    }
                </div>
            </div>
        </div>
    )
}
