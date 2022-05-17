import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
import { modalState, modalTypeState } from '../atoms/modelAtom';
import { getPostsState } from '../atoms/postAtom'
import { useRecoilState } from 'recoil';
import { CommentOutlined, DeleteRounded, ReplyRounded, } from '@mui/icons-material';
import { useSession } from 'next-auth/react'

function Post({ post, modalPost }) {

    const [showInput, setShowInput] = useState(false)
    const [modalOpen, setModalOpen] = useRecoilState(modalState)
    const [modalType, setModalType] = useRecoilState(modalTypeState)
    const [postState, setPostState] = useRecoilState(getPostsState)
    const [liked, setLiked] = useState(false)
    const { data: session } = useSession()

    const truncate = (string, maxCharacters) =>
        string?.length > maxCharacters ? string.substr(0, maxCharacters - 1) + '...see more' : string;
    return (
        <div className={`bg-white dark:bg-[#1D2226] py-2.5 border ${modalPost ? 'rounded-r-lg' : 'rounded-lg'} border-gray-300 dark:border-none`}>
            <div className='flex items-center px-2.5 cursor-pointer'>
                <Avatar src={post.userImg} className='!h-10 !w-10 cursor-pointer' />
                <div className='mr-auto ml-2 leading-none'>
                    <h6 className='font-medium hover:text-blue-500 hover:underline'>
                        {post.username}
                    </h6>
                    <p className='text-sm dark:text-white/75 opacity-80'>{post.email}</p>
                </div>
                {modalPost ? (
                    <IconButton onClick={() => setModalOpen(false)}>
                        <CloseRoundedIcon className="dark:text-white/75 h-7 w-7" />
                    </IconButton>
                ) : (
                    <IconButton>
                        <MoreHorizRoundedIcon className='dark:text-white/75 h-7 w-7' />
                    </IconButton>
                )}
            </div>

            {post.input && (
                < div className='py-2 px-3 break-all md:break-normal'>
                    {showInput || modalPost ? (
                        <p onClick={() => setShowInput(false)}>{post.input}</p>
                    ) : (
                        <p onClick={() => setShowInput(true)}>{truncate(post.input, 150)}</p>
                    )}
                </div>
            )}

            {post.imageUrl && !modalPost && (
                <img src={post.imageUrl} alt='' className='w-full cursor-pointer' onClick={() => {
                    setModalOpen(true)
                    setModalType('gifYouUp');
                    setPostState(post)
                }}
                />
            )}

            <div className='flex justify-evenly items-center dark:border-t border-gray-600/80 pt-2 text-black/80 dark:text-white/75'>
                {modalPost ? (
                    <button className='postButton'>
                        <CommentOutlined />
                        <h4>Comment</h4>
                    </button>
                ) : (
                    <button onClick={() => setLiked(!liked)} className={`postButton ${liked && 'text-blue-500'}`}>
                        {liked ? (
                            <ThumbUpOffAltRoundedIcon className='-scale-x-100' />
                        ) : (
                            <ThumbUpOffAltOutlinedIcon className='-scale-x-100' />
                        )}
                        <h4>Like</h4>
                    </button>
                )}
                {session?.user?.email === post.email ? (
                    <button className='postButton focus:text-red-400'>
                        <DeleteRounded />
                        <h4>Delete post</h4>
                    </button>
                ) : (
                    <button className='postButton'>
                        <ReplyRounded className='-scale-x-100' />
                        <h4>Share</h4>
                    </button>
                )}
            </div>

        </div >
    )
}

export default Post