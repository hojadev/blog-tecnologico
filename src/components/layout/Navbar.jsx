import { Link, useNavigate } from "react-router-dom"
import { postCategories } from "../../content/categories"
import { useContext, useEffect, useState } from "react"
import { css } from "../../content/styles"
import { UserContext } from "../../context/UserContext"
import { UserNavbar } from "../commun/UserNavbar"

export const Navbar = () => {

    const [toggleMenu, setToggleMenu] = useState(true)
    const { user, logOut} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = async() => {
        try {
            await logOut();
            navigate("/");

        } catch (error){
            console.log(error);
        }
    }
    

    return (
        <nav className="bg-color-primary w-full h-[70px] flex flex-row justify-between items-center">
            <div className="w-full lg:w-[70%] lg:m-auto flex flex-row justify-between items-center relative">
                <Link to={"/"} className="text-4xl font-bold ml-2 lg:ml-0 text-white">Orbita</Link>

                <ul className={`${toggleMenu ? "hidden" : "absolute flex flex-col top-[55px] right-0 py-[20px] w-[50%] text-right gap-9 h-[300px] z-50 bg-[#39416d] justify-center items-end rounded-b-xl shadow-2xl"}`}>
                    {user?.displayName ? (
                        <div className=" flex flex-row gap-4 mr-3 bg-color-primary py-3 px-1 justify-center rounded-lg shadow-lg">
                            <UserNavbar/>
                            <button onClick={handleLogOut} className="text-white">Log Out</button>
                        </div>
                    ) : (
                        <Link to={"/login"} className="mr-5 flex flex-row  items-center font-semibold text-white bg-color-primary py-3 px-1 justify-center rounded-lg shadow-lg">
                        Login
                        <img className="w-[25px]" src="/user.svg" alt="" />
                        </Link>
                    )}
                    {
                        user?.displayName && (
                        <Link className="flex flex-row mr-3 bg-color-primary py-3 px-1 justify-center rounded-lg shadow-lg" to={"/saveposts"}>
                                <p className="mr-1 flex flex-row justify-center items-center font-semibold text-white">Publicaciones Guardadas</p>
                                <img src="/save.svg" alt="" className="w-[20px]"/>
                        </Link>)
                    }
                    <Link className="flex flex-row mr-3 bg-color-primary py-3 px-1 justify-center rounded-lg shadow-lg" to={"/search/all"}>
                            <p className="mr-1 flex flex-row justify-center items-center font-semibold text-white">Busqueda</p>
                            <img src="/lupa.svg" alt="" className="w-[20px]"/>
                    </Link>
                
                </ul>


                <div className="flex flex-row mr-2 lg:mr-0">
                    {
                        user?.displayName && (
                        <Link className="hidden lg:flex flex-row mr-3 bg-color-primary py-3 px-1 justify-center rounded-lg" to={"/saveposts"}>
                                <p className="mr-1 flex flex-row justify-center items-center font-semibold text-white">Guardados</p>
                                <img src="/save.svg" alt="" className="w-[20px]"/>
                        </Link>)
                    }
                    <Link className="lg:flex flex-row mr-5 hidden" to={"/search/all"}>
                        <p className="mr-1 flex flex-row justify-center items-center font-semibold text-white">Busqueda</p>
                        <img src="/lupa.svg" alt="" className="w-[20px]"/>
                    </Link>
                    {user?.displayName ? (
                        <div className=" lg:flex flex-row gap-4 mr-3 hidden">
                            <UserNavbar/>
                            <button onClick={handleLogOut} className="text-white">Log Out</button>
                        </div>
                    ) : (
                        <Link to={"/login"} className="mr-5 lg:flex flex-row justify-center items-center font-semibold text-white hidden">
                        Login
                        <img className="w-[25px]" src="/user.svg" alt="" />
                        </Link>
                    )}
                    <button onClick={() => setToggleMenu(!toggleMenu)}>
                        <img className="w-[25px] lg:hidden"
                        src="/burger.svg" alt="" />
                    </button>
                </div>
            </div>
        </nav>
    )
}
