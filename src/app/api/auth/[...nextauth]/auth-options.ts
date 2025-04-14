import { routes } from "@/config/routes";
import { axiosBackendUrl } from "@/lib/getAxios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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

      // Handle Social Auth
      if (data?.account?.provider === "google" || data?.account?.provider === "apple") {
        const values = {
          name: data?.user?.name,
          email: data?.user?.email,
          provider: data?.account?.provider,
        };

        const { data: registerData } = await axiosBackendUrl.post("/api/v1/auth/register", values);
        if (registerData?.status) return registerData?.data;
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};
