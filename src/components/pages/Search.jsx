import React, { useState } from 'react'
import { postCategories } from '../../content/categories'
import { LoadingCardPost } from '../commun/LoadingCardPost'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import {collection,getDocs, query, where} from "firebase/firestore"
import { db } from '../../../fireBaseConfig'
import { PostCard } from '../commun/PostCard'
import { PackOfLoadingPost } from '../commun/PackOfLoadingPost'

export const Search = () => {
    const { category, search } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [postFilter, setPostFilter] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    

    const capturarInput = (event) => {
        event.preventDefault();
        setSearchWord(event.target.value);
    };

    const handleFormulario = (event) => {
        event.preventDefault();
        window.location.replace(`/search/${category}/${searchWord}`);
    };


    useEffect( () => {

        setIsLoading(true);
        const postCollection = collection(db , "post");
        let consulta;
        if(category !== "all"){
            const filterPost = query( postCollection , where("category", "==", category));
            consulta = filterPost;
        }else{
            consulta = postCollection;
        };
        
        if( search ){
            getDocs( consulta )
            .then(res => {
                const post = res.docs.map( (post) => {
                        return {...post.data(), id:post.id}
                });
                let newPost = [];
                post.forEach( (post) => {
                    if(post.title.toLowerCase().includes( search )){
                        newPost.push( post );
                    };
                })
                    setPostFilter(newPost)})
                    .finally(() => setIsLoading(false));
        }else {
            getDocs( consulta )
            .then(res => {
                const post = res.docs.map( (post) => {
                        return {...post.data(), id:post.id}});
                    setPostFilter(post)})
                    .finally(() => setIsLoading(false));

        }
        
    }, [category])
    
    return (
        <section className='w-full lg:w-[60%] m-auto flex flex-col gap-4 '>
            
            <h2 className='py-4 text-5xl font-semibold text-[#535C91]'>Busqueda :</h2>
            
            <form action="" className='flex flex-row flex-grow items-center justify-around lg:w-full w-[90%] m-auto lg:m-0'>
                <input type="text" name="" id="" placeholder="Busca por titulo de la publicacion" className='w-[94%] h-[35px] p-1 shadow-lg border border-gray-300 rounded-md' onChange={capturarInput}/>
                <button type='sumbit' className='bg-color-primary p-1 rounded-md' onClick={handleFormulario}>
                    <img src="/lupa.svg" alt="" className='w-[25px] rounded-md'/>
                </button>
            </form>
            
            <div className='w-full flex flex-col lg:flex-row'>
                <div className='w-[50%] lg:w-[25%] m-auto lg:mt-10'>
                    <h3>Categorias</h3>
                    <hr className='my-5'/>
                    <ul className='flex flex-col gap-4'>
                        {postCategories.map( (categorie) => {
                            return (
                                <Link className={categorie.id !== category ? 'hover:scale-105 duration-75 hover:text-[#535C91]' : "text-[#535C91] cursor-default"}
                                to={categorie.path}
                                key={categorie.path}
                                
                                > {categorie.categorieName} </Link>
                            )
                        })}
                        <Link to={"/search/all"}>All</Link>
                    </ul>
                </div>
    
                    <div className='flex flex-col justify-around lg:ml-10 gap-10 h-[70vh] overflow-scroll w-[100%] mt-12'>
                
                        {
                            isLoading ? (<PackOfLoadingPost/> ): ( postFilter.length > 0 ?
                                postFilter.map ( (postInformation) =>{
                                    return <PostCard key={postInformation.id}
                                    postContent={postInformation}
                                    />
                                } ) : 
                                <div className='flex justify-center items-center'>
                                    <h2 className='text-3xl font-extrabold w-[60%]'>No se encontro un post con esa categoria o nombre</h2>
                                </div>
    
                            )
                        }

                        </div>

            </div>
        </section>
    )
}
