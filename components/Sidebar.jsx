import { AddRounded, BookmarkOutlined } from "@mui/icons-material"
import { Avatar } from "@mui/material"
import Image from "next/image"
import { useSession } from "next-auth/react"
function SideBar() {
    const { data: session } = useSession()
    return (
        <div className="space-y-2 min-w-max max-w-lg">
            {/* Top */}
            <div className="bg-white rounded-lg overflow-hidden flex relative flex-col items-center text-center border border-x-gray-300 dark:border-none dark:bg-[#1D2226]">
                <div className="relative w-full h-14">
                    <Image src='https://rb.gy/i26zak' alt='' layout="fill" priority />

                </div>

                <Avatar src={session?.user?.image} className='!h-14 !w-14 !top-4 !cursor-pointer !absolute !border-2' />


                <div className='mt-5 py-4 space-x-0.5'>
                    <h4 className='hover:underline underline-offset-1 cursor-pointer decoration-purple-700'>{session?.user?.name}</h4>
                    <p className='text-black/60 dark:text-white/75 text-sm'>{session?.user?.email}</p>

                </div>
                <div className="hidden md:inline text-left dark:text-white/75 text-sm">
                    <div className="font-medium sidebarButton space-y-0.5">
                        <div className="flex justify-between space-x-2">
                            <h4>Who viewed your profile</h4>
                            <span className="text-blue-500">123</span>
                        </div>
                        <div className="flex justify-between space-x-2">
                            <h4>Viwes of your post</h4>
                            <span className="text-blue-500">2</span>
                        </div>
                    </div>
                    <div className="sidebarButton">
                        <h4 className="text-xs">
                            Access exclusive tools & insights

                        </h4>
                        <h4 className="dark:text-white font-medium">
                            <span className="w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1" />
                            Try Premium for free
                        </h4>

                    </div>
                    <div className='sidebarButton flex items-center space-x-1.5'>
                        <BookmarkOutlined className='!-ml-1' />
                        <h4 className="dark:text-white font-medium">My items</h4>
                    </div>
                </div>
            </div>


            {/* Bottom */}
            <div className='hidden md:flex bg-white dark:bg-[#1D2226] text-black/70 dark?text-white/75 rounded-lg overflow-hidden flex-col space-y-2 pt-2.5 sticky top-20 border border-gray-300 dark:border-none'>
                <p className='sidebarLink'>Groups</p>
                <div className='flex items-center justify-between'>
                    <p className='sidebarLink'>Events</p> <AddRounded className="!h-5" />
                </div>
                <p className='sidebarLink'>Followed Hastags</p>
                <div className="sidebarButton text-center">
                    <h4 className="dark:text-white font-medium text-sm">Discover more</h4>
                </div>

            </div>
        </div >
    )
}

export default SideBar