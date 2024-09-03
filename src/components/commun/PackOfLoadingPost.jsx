import React from 'react'
import { LoadingCardPost } from './LoadingCardPost'

export const PackOfLoadingPost = () => {
    return (
        <div className='flex flex-col gap-10'>
            <LoadingCardPost/>
            <LoadingCardPost/>
            <LoadingCardPost/>
        </div>
    )
}
