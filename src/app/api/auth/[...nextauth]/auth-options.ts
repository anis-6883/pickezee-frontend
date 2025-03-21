import { routes } from "@/config/routes";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: routes.publicRoutes.login,
    error: routes.publicRoutes.login,
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // Expire in 30 Days
  },
  callbacks: {
    async jwt(data: any) {
      if (data?.account?.provider === "credentials") {
        if (data?.user) return data?.user;
      }

      if (data?.trigger === "update") {
        if (data.session) return data.session;
      }

      return data?.token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: { ...session.user, ...token },
      };
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        return JSON.parse(credentials.userData);
      },
    }),
  ],
};
