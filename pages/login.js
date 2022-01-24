import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

export default function login() {
    const { data: session, status } = useSession()
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
        </div>
    )
}