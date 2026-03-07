import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  session: {
    strategy: "jwt"
  },

  pages: {
    signIn: "/login"
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      return baseUrl + "/platform"
    }
  },

  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }