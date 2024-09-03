import HTMLReactParser from "html-react-parser"
import { ActionsPosts } from "./ActionsPosts"
import { useEffect } from "react"
import { Link } from "react-router-dom"



export const FullPost = ( {post} ) => {

    useEffect(()=>{

    },[post])
    return (
        <div className="w-[95%] lg:w-[50%] m-auto">
            <h1 className="text-[#535C91] text-6xl font-bold italic mt-12 mb-4 z-0"> {post.title} </h1>

            <div className="flex flex-row justify-between">
                <div>
                    <p className="text-[#535C91] text-md font-thin italic mb-1"> {post.category.toUpperCase()}</p>
                    <Link to={`/profile/${post.idAuthor}`} className="text-sm text-gray-500 flex flex-row gap-2">Publicado por:
                        <p className="text-[#545C91] mr-1 font-extrabold">{post.Author}</p>
                    </Link>
                    <p className="text-sm text-gray-500"> {post.date} </p>  
                </div>

                <ActionsPosts post={post}/>

            </div>

            <img src={post.img} alt="" className="w-[100%]"/>


            <div className="mt-5 w-full overflow-x-scroll lg:overflow-auto flex flex-col justify-center ">
                { HTMLReactParser(post.content) } 
            </div>
        </div>
    )
}
