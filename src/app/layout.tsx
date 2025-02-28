import NprogressBar from "@/components/common/NprogressBar";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";
import { authOptions } from "./api/auth/[...nextauth]/auth-options";
import { outfit } from "./fonts";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import ReduxProvider from "./providers/ReduxProvider";

export const metadata: Metadata = {
  title: "Pickezee",
  description: "E-commerce Web App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className={`${outfit.className}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <AuthProvider session={session}>
              <NprogressBar />
              {children}
              <Toaster />
            </AuthProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
