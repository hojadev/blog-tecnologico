import { collection, doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { db } from "../../../fireBaseConfig";
import { FullPost } from "../commun/FullPost";
import { LoadingFullPost } from "../commun/LoadingFullPost";
import { CommentInPost } from "../commun/CommentInPost";
import { UserContext } from "../../context/UserContext";
import { NoCommentPost } from "../commun/NoCommentPost";

export const Post = () => {

    const {user} = useContext(UserContext);
    const { id } = useParams();
    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(true)

    const getPost = async () => {
        setIsLoading(true)
        let postCollection = collection(db, "post");
        let refPost = doc( postCollection, id )
        await getDoc( refPost )
        .then( res => {
            setPost( {...res.data(),id: res.id});
        })
        setIsLoading(false);
    }

    useEffect( () => {

        getPost();
    },[id] )

    return (
        <div className="flex flex-col items-center justify-center"> 
            { isLoading ? <LoadingFullPost/> : <FullPost post={post}/>}
            {user?.displayName ? <CommentInPost/> : <NoCommentPost/>}
        </div>
    )
}
