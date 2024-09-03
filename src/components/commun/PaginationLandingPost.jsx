import { collection, getDocs, limit, query, startAfter, startAt } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../fireBaseConfig';
import { PostCard } from './PostCard';
import { LoadingPreviewPost } from './LoadingPreviewPost';

export const PaginationLandingPost = () => {

    const [currentPagePost, setCurrentPagePost] = useState([]);
    const [lastSeen, setLastSeen ] = useState(null);
    const [firstOfLastPage, setFirstOfLastPage ] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const getFirstPagePost = async() => {
        setIsLoading(true);
        const first = query(collection(db, "post"), limit(4));
        const documentSnapshots = await getDocs(first);
        const post = documentSnapshots.docs;
        
        const FirstPage = post.map( (res) => {
            return {...res.data(),id:res.id}})
        
        setCurrentPagePost(FirstPage);
        const lastVisible = post[documentSnapshots.docs.length-1];
        const firstPost = post[0];
        setLastSeen(lastVisible);
        setFirstOfLastPage(firstPost);
        setIsLoading(false);
    };

    const nextPage = async() => {
        setIsLoading(true);
        scrollToTop();
        const first = query(collection(db, "post"),
        startAfter(lastSeen), 
        limit(4));

        const documentSnapshots = await getDocs(first);
        const post = documentSnapshots.docs;

        const currentPage = post.map( (res) => {
            return {...res.data(),id:res.id}})
        
        setCurrentPagePost(currentPage);
        scrollToTop();
        setIsLoading(false);
    };

    const prePage = async () => {
        setIsLoading(true);
        scrollToTop();
        const first = query(collection(db, "post"),
        startAt(firstOfLastPage), 
        limit(4));

        const documentSnapshots = await getDocs(first);
        const post = documentSnapshots.docs;

        const currentPage = post.map( (res) => {
            return {...res.data(),id:res.id}})
        
        setCurrentPagePost(currentPage);
        setIsLoading(false);
    }
    
    useEffect( () => {
        getFirstPagePost();
    }, [])

    return (
        
        <div className='mt-5 flex flex-col justify-center items-center'>

            {
                isLoading ? 
                (
                    <div>
                        <LoadingPreviewPost/> 
                        <LoadingPreviewPost/> 
                        <LoadingPreviewPost/> 
                        <LoadingPreviewPost/> 
                    </div>
                ) :
                (
                    <div className='flex flex-row flex-wrap m-auto gap-8'>
                        {
                            currentPagePost.map( (res) => {
                                return <PostCard postContent={res} key={res.id}/>
                            })

                        }

                    </div>
                )
            }


            <div className='flex flex-row m-auto gap-10 mt-10'>
                <button onClick={prePage}> <img src="/back.svg" alt="" className='w-[50px] bg-color-primary rounded-lg shadow-md'/> </button>
                <button onClick={nextPage} > <img src="/next.svg" alt="" className='w-[50px] bg-color-primary rounded-lg shadow-md'/> </button>
            </div>

        </div>
    )
}
