import { useSession, signIn, signOut, getSession } from "next-auth/react"
import Link from "next/link";

export default function login() {
    const { data: session, status } = useSession()
    if (session) {
        return (
            <>
                <div className=" bg-gray-800">
                    Signed in as {session.user.email} <br />
                    <button onClick={() => signOut()}>Sign out</button>
                    <Link href='/'>Go Home</Link>
                </div>
            </>
        )
    }
    return (
        <div className="bg-gray-800 flex flex-col justify-center items-center h-[89.9vh] gap-5">
            Not signed in <br />
            <button className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-400" onClick={() => signIn()}>Sign in</button>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) return { redirect: { destination: '/', permanent: false, } }
    return {
        props: {}
    };
  }