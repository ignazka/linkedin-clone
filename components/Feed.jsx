import Input from "./Input"
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useSSRPostState, handlePostState } from '../atoms/postAtom'
import Post from "./Post"


function Feed({ posts }) {
    const [realtimePosts, setRealtimePosts] = useState([])
    const [handlePost, setHandlePost] = useRecoilState(handlePostState)
    const [SSRPosts, setSSRPosts] = useRecoilState(useSSRPostState)

    const fetchPosts = async () => {
        const response = await fetch('/api/posts', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        const responseData = await response.json()
        setRealtimePosts(responseData)
        setHandlePost(false)
        setSSRPosts(false)
    }

    useEffect(() => {
        fetchPosts()
    }, [handlePost])
    return (
        <div className="space-y-6 pb-24 max-w-lg">
            <Input />
            {!SSRPosts ? realtimePosts.map(post => (

                <Post key={post._id} post={post} />
            ))
                : (
                    posts.map(post => (
                        <Post key={post._id} post={post} />
                    ))
                )
            }


        </div>
    )
}

export default Feed