import NextAuth from "next-auth";

const handler = NextAuth({
  providers:[
    GoogleProvider({
      clientID: process.env.GOOGLE_CLIENT_ID??"",
      clientSecret: process.env.GOOGLE_SECRET??""
    })
  ]
})
export {handler as Get , handler as Post};