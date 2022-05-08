import React from 'react'

function Post({ post }) {
    return (
        <div>Post
            <p>{post.input}</p>
            <img src={post.imageUrl} />
        </div>
    )
}

export default Post