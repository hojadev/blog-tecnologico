import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from "../../../fireBaseConfig";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css";

export const ActionsPosts = ({post}) => {

    const {user} = useContext(UserContext);
    const [likes, setLikes] = useState([]);
    const [postSave, setPostSave] = useState([]);
    const [isSave, setIsSave] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const navigate = useNavigate();


    
    const getSavePostUser = async() => {
        const profileRef = doc(db, 'userProfiles', user.uid);
        const profileDoc = await getDoc( profileRef );
        const profileData = profileDoc.data();

        setPostSave(profileData.savePosts);
    }

    const savePost = () => {

        
        if(user?.displayName){
            if( postSave.some(postid => postid === post.id ) ){
                const postRef = doc(db, 'userProfiles', user.uid);
                let newPosts = postSave.filter(p => p !== post.id)
                setDoc(postRef, { savePosts: [...newPosts] }, { merge: true });
                setIsSave(false);
                Toastify({
                    text: "Ya no esta en tus guardados",
                    duration: 2000,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #910718, #FB4001)",
                    }}).showToast();
            }else{
                const postRef = doc(db, 'userProfiles', user.uid);
                setDoc(postRef, { savePosts: [...postSave,post.id] }, { merge: true });
                console.log("guardado")
                setIsSave(true);
                Toastify({
                    text: "Se ha guardado la publicacion",
                    duration: 2000,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }}).showToast();
            }
        }else {
            Toastify({
                text: "Necesitas registrarte para guardar la publicacion",
                
                duration: 2000,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #910718, #FB4001)",
                },
            }).showToast();
        }    
    }

    const getLikesPost = async() => {
        
        const postRef = doc(db, 'post', post.id);
        await getDoc(postRef)
        .then( res => {
            setLikes(res.data().likes)
        })
    }
    
    
    
    const likePost =  () => {
        
        const userLikes = () => idLike => idLike === user.uid;

        if(user?.displayName){
            if( likes.some( userLikes ) ){
                const postRef = doc(db, 'post', post.id);
                let newLikes = likes.filter(like => like !== user.uid)
                setDoc(postRef, { likes: [...newLikes] }, { merge: true });
                setIsLike(false);
                Toastify({
                    text: "Se ha quitado el like",
                    duration: 2000,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #910718, #FB4001)",
                    }}).showToast();
            }else{
                const postRef = doc(db, 'post', post.id);
                setDoc(postRef, { likes: [...likes,user.uid] }, { merge: true });
                setIsLike(true);
                Toastify({
                    text: "Gracias por dar like!",
                    duration: 2000,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }}).showToast();
            }
        }else {
            Toastify({
                text: "Necesitas registrarte para dar Like",
                duration: 2000,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #910718, #FB4001)",
                },
            }).showToast();
        }
        
        
    }  

    const getPostUserInfo = () => {
        if(likes.includes(user.uid)){
            setIsLike(true);
        }else{
            setIsLike(false);
        }
        if(postSave.includes(post.id)){
            setIsSave(true);
        }else{
            setIsSave(false);
        }
    }

    useEffect( () => {
        if(user){            
            getLikesPost();
            getSavePostUser();
            getPostUserInfo();
        }else{
            getLikesPost();
        }
    }, [likes,postSave])
    
    
    return (
        <div className="flex flex-row gap-2">
            <button onClick={likePost} className=" bg-[#535C91] px-2 py-3 flex justify-center items-center rounded-xl h-fit shadow-sm">
                <p className={ isLike?`absolute text-sm font-extrabold text-white`:`absolute text-sm font-extrabold text-[#535C91]`}>{likes.length}</p>
                {
                    isLike ? (
                        <img className="w-[28px]" 
                        src="/loveFill_red.svg" alt="" />
                    ) : (
                        <img className="w-[28px]" 
                        src="/loveFill.svg" alt="" />
                    )
                }
            </button>
            <button onClick={savePost} className=" bg-[#535C91] px-2 py-3 flex justify-center items-center rounded-xl h-fit shadow-sm">
            {
                    isSave ? (
                        <img className="w-[28px]" 
                        src="/save_gold.svg" alt="" />
                    ) : (
                        <img className="w-[28px]" 
                        src="/save.svg" alt="" />
                    )
                }
            </button>
        </div>
    )
}
