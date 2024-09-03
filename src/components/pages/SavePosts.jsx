import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../fireBaseConfig";
import firebase from "firebase/compat/app";
import { PostCard } from "../commun/PostCard";
import { LoadingCardPost } from "../commun/LoadingCardPost";
import { LoadingPreviewPost } from "../commun/LoadingPreviewPost";

export const SavePosts = () => {

    const {user} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [postSave, setPostSave] = useState([]);
    const [posts, setPosts] = useState([]);

    

    useEffect(() => {
        const fetchPosts = async () => {

            const docRef = doc(db, "userProfiles", user.uid);
            const docSnap = await getDoc(docRef);
            const postList = docSnap.data().savePosts
            const postsArray = []
            console.log(postList);
    

            for (const postId of postList) {
                const docRef = doc(db, 'post', postId); 
    
                try {
                    const docSnapshot = await getDoc(docRef);
                    if (docSnapshot.exists()) {
                    const postData = docSnapshot.data();
                    postsArray.push({...postData,id:postId});
                } else {
                    console.log(`El documento con ID ${postId} no existe.`);
                }
                } catch (error) {
                console.error('Error al obtener el documento:', error);
                }
            }
    
            setPosts(postsArray);
            setIsLoading(false);
        };
    
        fetchPosts(); 

    }, [posts,user]); 
    
    return (
        <section className="w-[80%] m-auto items-center ">
            <div className="flex flex-col">
                <img src={user.photoURL} className="w-[150px] m-auto mt-10 rounded-full" alt="" />
                <h1 className=" text-3xl text-center mt-2">Publicaciones Guardadas <p className="text-[#535c91] font-bold">{user.displayName}</p></h1>
            </div>
            <div className="flex flex-col md:flex-row flex-wrap gap-10 mt-10">
                { isLoading ? (
                    <div className="flex flex-col md:flex-row flex-wrap gap-10 mt-10 items-center justify-between m-auto">
                            <LoadingPreviewPost/> 
                            <LoadingPreviewPost/> 

                    </div>
            ):
                    posts.map( postSaveByUser => {
                        return <PostCard postContent={ postSaveByUser }/>
                    } )
                }
            </div>
        </section>
    )
}
