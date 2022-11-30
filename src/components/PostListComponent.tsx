import React, {useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from "../hooks"
import { loadPosts } from '../store/postsReducer'
import { PostComponent } from "./PostComponent"

export const PostListComponent = () => {
    const dispatch = useAppDispatch()
    const {status, error, postList} = useAppSelector(store => store.postsReducer)
    useEffect(()=>{
        dispatch(loadPosts())
    },[])
    return(
    <div>
    <div className='container-information-by-post-list'>
        <div className='count-found-posts'>
            <p>Найдено "{postList?.length}" постов</p>
        </div>
    </div>
    <div className="container-post-list">
        {
            error ? <h3>{error}</h3> : null
        }
        {
            postList?.map(item => (
                <PostComponent {...item}/>
            ))
        }
    </div>
    </div>
    )
}