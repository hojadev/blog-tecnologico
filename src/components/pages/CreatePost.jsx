import React, { useContext, useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import JoditEditor from "jodit-react";
import HTMLReactParser from "html-react-parser"
import { convertDay } from '../../content/converterMonth';
import { db } from '../../../fireBaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { postCategories } from '../../content/categories';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css";

export const CreatePost = () => {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();


    //EDITOR VARIABLES
    const editor = useRef(null);

    const getDate = () => {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let fullDate = `${day} ${convertDay(month)} ${year}`
        return fullDate;
    }

    const [post, setPost] = useState({
        img:"",
        title:"",
        Author: user.displayName,
        content:"",
        date: getDate(),
        idAuthor:user.uid,
        desc:"",
        category: "",
        likes:0,
        comentarios:[],
    });



    const capturarInput = (event) => {
        event.preventDefault();
        setPost({...post, [event.target.name]:event.target.value})
    }


    const publicarPost = (e) => {
        e.preventDefault();
        
        setPost({ ...post, Author:user.displayName,date:getDate(), idAuthor:user.uid})

        
        let postCollection = collection(db, "post");
        addDoc(postCollection, post).then((res) => {

        })
        navigate("/")
        Toastify({
            text: "Publicacion creada!",
            duration: 2000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }}).showToast();

        
    }

    useEffect( () => {
        if(user == null){
            navigate("/");
        }else{
        }
    },[user,post]);

    return (
        <section className='h-[100%]'>
            <div className='w-[80%] lg:m-auto flex flex-col justify-center items-center'>


                <h1 className='text-[#535C91] text-7xl font-bold italic drop-shadow-lg mt-5'>Crea tu Post</h1>

                <form action="" onSubmit={publicarPost} className='mt-16'>
                    <div className='flex flex-col'>
                        <label className='text-xl mb-2'>URL de la Imagen</label>
                        <input type="text" name='img' onChange={capturarInput } className='border border-[#535C91] rounded-lg p-2' required/>
                        <hr  className='text-grey my-5'/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-xl mb-2'>Titulo del Post</label>
                        <input type="text" name='title' onChange={capturarInput } className='border border-[#535C91] rounded-md p-2' required/>
                        <hr  className='text-grey my-5'/>
                    </div>
                    <div className='flex flex-col'>
                        <label  className='text-xl mb-2'>Descripcion del Post</label>
                        <input type="text" name='desc' maxLength="200" onChange={capturarInput } className='border border-[#535C91] rounded-md h-[100px] overflow-y-scroll' required/>
                        <hr  className='text-grey my-5'/>
                    </div>
                    <div className='flex flex-col'>
                        <label  className='text-xl mb-2'>Descripcion del Post</label>
                        <select name="category" id="" onChange={capturarInput}>
                            {
                                postCategories.map( (category) => {
                                    return(
                                        <option key={category.path} value={category.path}> {category.categorieName} </option>
                                    )
                                })
                            }
                        </select>
                        <hr  className='text-grey my-5'/>
                    </div>


                    <div className=' text-black'>
                        <p>Contenido</p>
                        <JoditEditor ref={editor} value={post.content} onChange={ (newContent) => setPost( {...post, content:newContent} ) }/>

                    </div>
                    <button 
                    className='px-5 py-3 bg-color-primary text-white rounded mt-5 hover:scale-105 duration-100 hover:shadow-md' type="submit">Publicar</button>

                </form>

            </div>
        </section>
    )
}
