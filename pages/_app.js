import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Layout from '../components/Layout'
import Head from 'next/head'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Chat App</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
