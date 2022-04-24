import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { getSession, useSession } from 'next-auth/react'
export default function Home() {
  const { data: session } = useSession()
  console.log(session)
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
          {/* Feed */}
        </div>
        {/* Widgets */}
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
