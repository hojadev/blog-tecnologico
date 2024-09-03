import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { useParams } from "react-router-dom";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { convertDay } from "../../content/converterMonth";
import { db } from "../../../fireBaseConfig";
import { CommentCard } from "./CommentCard";
import { get } from "firebase/database";


export const CommentInPost = () => {
    
    const getDate = () => {
        const date = new Date();
    
        let day = date.getUTCDate();
        let month = date.getUTCMonth();
        let year = date.getUTCFullYear();
        let hour = date.getUTCHours();
        let minute = date.getUTCMinutes();
        let fullDate = `${day} ${convertDay(month)} ${year} - ${hour}:${minute}`
        return fullDate;
    }
    
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [commentsMade, setCommentsMade] = useState([]);
    const [commentPost, setCommentPost] = useState({
        userName: user.displayName,
        date: getDate(),
        content: "",

        
    })
    const contentInputRef = useRef(null);
    
    
    const submitCommentOnPost = async(e) => {
        e.preventDefault();
        
        setCommentPost({ ...commentPost, userId:user.uid, userName:user.displayName})

        const ref = doc(db, 'post',id);
        const refComments = collection(ref, "comments");
        await addDoc(refComments, commentPost);

        contentInputRef.current.value = "";

    }

    const capturarInput = (event) => {
        event.preventDefault();
        setCommentPost({...commentPost, [event.target.name]:event.target.value})
    }

    const getCommentsFromPost = async() => {

        const comments = []
        
        const ref = doc(db, 'post',id);
        const refComments = collection(ref, "comments");

        const commentsDocs = await getDocs(refComments);
        
        commentsDocs.forEach(element => {
            comments.push({...element.data(),id:element.id})
        });

        comments.sort((a,b) => a.date - b.date);

        
        setCommentsMade(comments);

        
    }

    useEffect( () => {
        getCommentsFromPost();
    },[commentPost,commentsMade])

    return (
        <div className="w-full lg:w-[60%] p-2 flex m-auto flex-col">
            <div className="flex flex-row m-auto gap-3 mt-7 w-full">
                <div className="flex flex-col justify-center items-center w-[20%]">
                    <img src={user.photoURL} alt="" className="w-[50px] rounded-full"/>
                    <p>{user.displayName}</p>
                </div>
                <form action="" onSubmit={submitCommentOnPost} className="flex flex-col w-full">
                    <textarea type="text" ref={contentInputRef}  name="content" placeholder="Deja un comentario" onChange={capturarInput} required className="border border-gray-500/40 px-1 rounded-md w-full" ></textarea>
                    <button type="submit" className="bg-color-primary text-white rounded-lg">Enviar</button>
                </form>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-[#535c91] text-3xl mt-7">Comentarios({commentsMade.length})</h2>
                {
                    commentsMade.sort().map( commentPost => {
                        return (<CommentCard commentPost={commentPost} key={commentPost.id}/>)
                    })
                }
                
            </div>
        </div>
    )
}
