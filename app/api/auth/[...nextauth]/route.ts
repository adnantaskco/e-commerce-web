import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // আপনার আগের Credentials Provider বা অন্যান্যা Providers নিচে থাকবে...
  ],
  pages: {
    signIn: "/login", // কাস্টম লগইন পেজের পাথ
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };