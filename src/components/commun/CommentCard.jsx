import { Link } from "react-router-dom"

export const CommentCard = ( {commentPost} ) => {
    return (
        <div className="border rounded-md my-2 p-3 w-full">
            <div className="flex justify-between">
                <Link to={`/profile/${commentPost.userId}`} className="text-[#535c91] font-extrabold">{commentPost.userName}</Link>
                <p className="text-gray-400"> {commentPost.date} </p>
            </div>
            <p> {commentPost.content} </p>
        </div>
    )
}
