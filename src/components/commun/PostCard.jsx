import parser from "html-react-parser"
import { Link } from "react-router-dom"


export const PostCard = ( {postContent} ) => {

    return (
        <article className="text-black flex flex-col w-[300px] md:w-[400px] h-[450px] m-auto">

            <img className="w-[300px] md:w-[400px] h-[230px]"
            src={postContent.img} alt="" />
            <div className="">

                <h3 className="text-[#535C91] text-xl font-extrabold"> { postContent.title} </h3>
                <p className="text-[#535C91] text-md font-thin italic"> { postContent.category } </p>
                <p className="text-sm text-gray-500"> {postContent.Author} </p>
                <p className="text-sm text-gray-500"> { postContent.date } </p>
                <p className="text-black text-sm text-balance"> { postContent.desc} </p>
            </div>
                <Link className="mt-2 max-w-fit " to={`/post/${postContent.id}/`}>
                    <button className="text-white bg-color-primary px-5 py-1 rounded-md hover:scale-105 duration-100 hover:shadow-md">Seguir Leyendo</button>
                </Link>
        </article>
    )
}
