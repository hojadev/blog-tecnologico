import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { postMock } from '../../content/postMock'
import { PostCard } from '../commun/PostCard'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../../../fireBaseConfig'
import { LoadingPreviewPost } from '../commun/LoadingPreviewPost'
import { PaginationLandingPost } from '../commun/PaginationLandingPost'


export const Landing = () => {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        let postCollection = collection(db,"post")

        getDocs( postCollection )
        .then((res) => {
            const posts = res.docs.map( (res) => {
                return {...res.data(),id:res.id}})
            setPosts( posts );
            setIsLoading(false);

        })
    }, [])


    return (
        <section className='text-black flex flex-col items-center lg:w-[60%] m-auto my-10'>
            <h1 className='text-9xl font-extrabold font_gradient_landing'>ORBITA</h1>
            <h1 className='text-black text-5xl my-12'>Ultimas Publicaciones</h1>
            <div>
            </div>
            <div className='flex flex-col md:flex-row md:flex-wrap gap-8'>


                {
                    isLoading ? (
                    <>
                        <LoadingPreviewPost/> 
                        <LoadingPreviewPost/> 
                        <LoadingPreviewPost/> 
                        <LoadingPreviewPost/> 

                    </>
                    ): (
                        <PaginationLandingPost/>

                    )

                }
            </div>
        </section>
    )
}
