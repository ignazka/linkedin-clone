import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modelAtom'
import { handlePostState } from '../atoms/postAtom'
import React from 'react'
import { useState } from 'react'
function Form() {
    const { data: session } = useSession()
    const [modalOpen, setModalOpen] = useRecoilState(modalState)
    const [handlePost, setHandlePost] = useRecoilState(handlePostState)
    const [input, setInput] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const handleChange = ({ target }) => setInput(target.value)

    const handleImage = ({ target }) => setImageUrl(target.value)
    const uploadPost = async event => {
        event.preventDefault()

        const response = await fetch('/api/posts',
            {
                method: "POST",
                body: JSON.stringify({
                    input: input,
                    imageUrl: imageUrl,
                    username: session.user.name,
                    email: session.user.email,
                    userImg: session.user.image,
                    createdAt: new Date().toString(),

                }),

                headers: {
                    'Content-Type': 'application/json'

                },
            })
        const responseData = await response.json()
        setHandlePost(true)
        setModalOpen(false)
    }
    return (
        <form
            className='flex flex-col relative space-y-2'
        ><textarea
            rows='4'
            placeholder='Write something'
            className='bg-transparent focus:outline-none '
            value={input}
            onChange={handleChange}
        ></textarea>
            <input
                className='bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm'
                type='text'
                placeholder='Add a photo URL (optional)'
                value={imageUrl}
                onChange={handleImage}
            >
            </input>
            <button type='submit'
                onClick={uploadPost} className='absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1'
                disabled={!input.trim() && !imageUrl.trim()}>
                Post
            </button>
        </form>
    )
}

export default Form