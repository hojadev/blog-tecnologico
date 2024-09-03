import { Link } from "react-router-dom"
import { postCategories } from "../../content/categories"


export const Footer = () => {
    return (
        <footer className="bg-color-primary flex flex-col lg:flex-row  py-8 mt-16 justify-around items-left lg:items-center">
            <div className="w-[30%] m-auto lg:m-0 lg:w-fit ">
                <h3 className="text-2xl mb-4 font-bold text-white">Contactanos</h3>
                <ul>
                    <li className="text-white">+56 9 54169597</li>
                    <li className="text-white">fernando.zaguirre@inacapmail.cl</li>
                </ul>
            </div>
            <div className="w-[30%] m-auto lg:m-0 lg:w-fit">
                <h3 className="text-2xl mb-4 font-bold text-white">Redes Sociales</h3>
                <ul className="text-white">
                    <li className="text-white">Facebook</li>
                    <li className="text-white">Instagram</li>
                    <li className="text-white">X (Twitter)</li>
                </ul>
            </div>
            <div className="w-[30%] m-auto lg:m-0 lg:w-fit">
                <h3 className="text-2xl mb-4 font-bold text-white">Categoria</h3>
                <ul className="flex flex-col ">
                    {
                        postCategories.map( (categorie) => {
                            return(
                                <Link to={categorie.path} key={categorie.path} className="text-white"> {categorie.categorieName}</Link>
                            )
                        } )
                    }
                </ul>
            </div>
            <div className="w-[30%] m-auto lg:m-0 lg:w-fit">
                <h3 className="text-2xl mb-4 font-bold text-white">Sobre Nosotros</h3>
                <ul>
                    <li className="text-white">Mision</li>
                    <li className="text-white">Proyecto</li>
                    <li className="text-white">X (Twitter)</li>
                </ul>
            </div>
        </footer>
    )
}
