import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom";


export const UserNavbar = () => {

    const { user } = useContext(UserContext);
    const [drop, setDrop] = useState("hidden");

    function openDropDown () {
        if(drop === "hidden"){
            setDrop("flex")
        } else {
            setDrop("hidden")
        };
    };

    return (
        <div className="flex flex-row cursor-pointer relative justify-center items-center" onClick={openDropDown}>
            <img src={ user.photoURL } className="w-[25px] mr-1 rounded-full" alt="" />
            <p className="font-bold text-white"> {user.displayName} </p>
            <img src="dropdown.svg" alt="" className="w-[15px]"/>
            <div className={ `flex flex-col gap-3 items-center justify-center bg-color-primary absolute top-20 shadow-2xl w-[130px] ${drop} py-2 rounded duration-100` }>
                <Link to={"/crear_post"} className="flex flex-row items-center justify-center text-white">
                    <img src="/create.svg" alt="" className="w-[20px] mr-2"/>
                    <p className="text-white">Crear Post</p>
                </Link>
                <Link to={`/profile/${user.uid}`} className="flex flex-row items-center justify-center">
                    <img src="/user.svg" alt="" className="w-[20px] mr-2"/>
                    <p className="text-white">Perfil</p>
                </Link>
            </div>
        </div>
    )
}
