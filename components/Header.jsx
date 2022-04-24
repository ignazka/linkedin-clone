import Image from 'next/image';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import { Avatar } from '@mui/material';
import HeaderLink from './HeaderLink';
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function Header() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme, theme } = useTheme()

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30
  }

  useEffect(() => setMounted(true), [])
  return (
    <header className='sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg'>
      <div className='flex items-center space-x-2 w-full max-w-xs'>
        {mounted &&
          <>
            {resolvedTheme === 'dark' ? (<Image src='https://rb.gy/bizvqj' width={45} height={45} />) : (<Image src='https://rb.gy/dpmd9s' width={55} height={55} />)}
          </>
        }
        <div className='dark:md:bg-gray-700 flex items-center space-x-1 py-2.5 px-4 rounded w-full'>
          <SearchRoundedIcon />
          <input
            type='text'
            placeholder='Search'
            className='hidden md:inline-flex focus:outline-none bg-transparent placeholder-black/70 text-sm flex-grow dark:placeholder-white/75  '
          />
        </div>
      </div>
      <div className='flex items-center space-x-6'>
        <HeaderLink Icon={HomeRoundedIcon} text='Home' active feed />
        <HeaderLink Icon={GroupIcon} text='My Network' feed />
        <HeaderLink Icon={BusinessCenterIcon} text='Jobs' feed hidden />
        <HeaderLink Icon={ChatIcon} text='Messaging' feed />
        <HeaderLink Icon={NotificationsIcon} text='Notifications' />
        <HeaderLink Icon={Avatar} text='Me' avatar feed hidden />
        <HeaderLink Icon={AppsOutlinedIcon} text='Work' />

        {/* dark mode toggler */}
        {mounted &&
          <div
            className={`bg-gray-600 flex items-center w-12 h-6 cursor-pointer rounded-full flex-shrink-0 px-0.5 relative ${resolvedTheme === 'dark' ? 'justify-end' : 'justify-start'}`}
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
            <span className='absolute left-0'> 🌜</span>

            {/* motion.div */}
            <motion.div className='transition-all w-5 h-5 bg-white rounded-full z-40 hover:border-2 hover:border-green-200 ' layout transition={spring} />
            <span className='absolute right-0.5'>🌞</span>
          </div>
        }
      </div>
    </header>
  );
}

export default Header;
