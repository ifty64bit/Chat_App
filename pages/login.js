import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

export default function login(props) {
    const { data: session, status } = useSession()
    console.log(session);
    console.log(props);
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
                <Link href='/'>Go Home</Link>
            </>
        )
    }
    return (
        <div className=" bg-gray-800">
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
            <div>
                URL is: {process.env.DATABASE_URL}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    
    return {
        props: { url:process.env.DATABASE_URL
    }, // will be passed to the page component as props
    }
  }