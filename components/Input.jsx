import { Avatar } from '@mui/material'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Article, PhotoSizeSelectActual, VideoCameraBack, BusinessCenter } from '@mui/icons-material'
import { useRecoilState } from 'recoil'
import { modalState, modalTypeState } from '../atoms/modelAtom'

function Input() {
    const { data: session } = useSession()
    const [modalOpen, setModalOpen] = useRecoilState(modalState)
    const [modalType, setModalType] = useRecoilState(modalTypeState)
    return (
        <div className='bg-white dark:bg-[#1D2226] rounded-lg space-y-3 border p-3 border-gray-300 dark:border-none'>
            <div className='flex items-center space-x-2'>
                <Avatar src={session?.user?.image}
                    className='!h-10 !w-10 cursor-pointer' />
                <motion.button onClick={() => {
                    setModalOpen(true)
                    setModalType('dropIn')
                }} className='rounded-full border border-gray-400 py-2.5 px-3 opacity-80 hover:opacity-100 font-medium w-full text-left' whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} >
                    Start a post
                </motion.button>
            </div>
            <div className='flex items-center justify-center flex-wrap gap-4 md:gap-10'>
                <button className="inputButton group">
                    <PhotoSizeSelectActual className='text-blue-400' />
                    <h4 className='opacity-80 group-hover:opacity-100'>Photo</h4>
                </button>
                <button className="inputButton group">
                    <VideoCameraBack className='text-green-400' />
                    <h4 className='opacity-80 group-hover:opacity-100'>Video</h4>
                </button>
                <button className="inputButton group">
                    <BusinessCenter className='text-blue-300' />
                    <h4 className='opacity-80 group-hover:opacity-100'>Job</h4>
                </button>
                <button className="inputButton group">
                    <Article className='text-red-400' />
                    <h4 className='opacity-80 group-hover:opacity-100 whitespace-nowrap'>Write Article</h4>
                </button>
            </div>

        </div >

    )
}

export default Input