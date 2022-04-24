import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import Feed from '../components/Feed';
import { AnimatePresence } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { modalState, modalTypeState } from '../atoms/modelAtom';
import Modal from '../components/Modal';

export default function Home() {
  const [modalOpen, setModalOpen] = useRecoilState(modalState)
  const [modalType, setModalType] = useRecoilState(modalTypeState)

  const router = useRouter()

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/home')
    }
  })

  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | FakedIn</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      <main className='flex justify-center gap-x-5 px-4 sm:px-12'>
        <div className='flex flex-col md:flex-row gap-5'>
          <Sidebar />
          <Feed />
        </div>
        {/* Widgets */}
        <AnimatePresence>
          {modalOpen &&
            <Modal type={modalType} handleClose={() => setModalOpen(false)} />

          }

        </AnimatePresence>
      </main>


    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/home',
      }
    }
  }

  return {
    props: {
      session
    }
  }
}
