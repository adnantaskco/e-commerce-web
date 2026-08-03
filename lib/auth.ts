import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    // 1. Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // 2. Credentials Provider (Email & Password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // TODO: আপনার ব্যাকএন্ড API বা ডেটাবেজে ইউজার ভ্যালিডেশন করুন
        // উদাহরণ:
        // const res = await fetch("YOUR_BACKEND_URL/api/login", { ... });
        // const user = await res.json();

        // উদাহরণ হিসেবে একটি ডামি ইউজার রিটার্ন করা হলো:
        const user = { id: "1", name: "User", email: credentials.email };

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],

  // কাস্টম পেজ সেটআপ
  pages: {
    signIn: "/login", // আপনার লগইন পেজের পাথ
  },

  // Session Strategy (JWT)
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};