import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"


export default NextAuth({
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  jwt: {
    encryption: true
  },
  secret: process.env.secret,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    redirect() {
      
      return process.env.NEXT_URL;
    },
    async session({ session, token, user }) {
      session.user._id = user.id;
      return session;
    },
  },
})