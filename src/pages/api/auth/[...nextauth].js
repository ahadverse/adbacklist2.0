import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    // 1️⃣ Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // 2️⃣ Email/password login via API
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            "https://adbacklist-backend2-0-vb3d.vercel.app/api/users/login",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          const data = res.data;

          if (data.message == "success") {
            return {
              id: data.user._id,
              name: data.user.name,
              email: data.user.email,
              credit: data.user.credit,
              token: data.token,
            };
          } else {
            return null; // invalid credentials
          }
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, profile }) {
      if (profile) {
        try {
          const response = await axios.post(
            "https://adbacklist-backend2-0-vb3d.vercel.app/api/users/save",
            profile
          );
          user.id = response.data.isExist._id;
          user.credit = response.data.isExist.credit;
        } catch (err) {
          console.error(err);
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      // Merge user into token
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
