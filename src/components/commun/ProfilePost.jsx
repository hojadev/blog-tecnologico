import parser from "html-react-parser"
import { Link } from "react-router-dom"


export const ProfilePost = ( {postContent} ) => {

    return (
        <article className="text-black flex flex-row w-[95%] h-[290px] m-auto shadow-lg bg-white justify-around items-center gap-4 rounded-md">

            <div>
                <img className="w-[300px]"
                src={postContent.img} alt="" />

            </div>
            <div className="w-[40%]">

                <h3 className="text-[#535C91] text-lg font-extrabold"> { postContent.title} </h3>
                <p className="text-[#535C91] text-md font-thin italic"> { postContent.category } </p>
                <p className="text-sm text-gray-500"> { postContent.date } </p>
                <p className="text-black text-sm text-balance"> { postContent.desc} </p>
                <Link className="mt-2 max-w-fit " to={`../../post/${postContent.key}/`}>
                    <button className="text-white bg-color-primary mt-5 px-5 py-1 rounded-md hover:scale-105 duration-100 hover:shadow-md">Seguir Leyendo</button>
                </Link>
            </div>
        </article>
    )
}
