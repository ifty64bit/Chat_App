import { useSession, getSession, signOut } from "next-auth/react"
import Link from 'next/link';
import Sidebar from "../components/Sidebar";
import Chatbox from "../components/Chatbox";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div>
      {session ? (
        <div className="grid grid-cols-12 h-[calc(100vh-11.3vh)] overflow-hidden text-lg">
          <Sidebar/>
          <Chatbox/>
        </div>
        )
        :
        (
          <>
            Not signed in <br /> <Link href="/login">Login Page</Link>
          </>
        )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/login',permanent: false, } }
  return {
    props: {session}, // will be passed to the page component as props
  }
}
