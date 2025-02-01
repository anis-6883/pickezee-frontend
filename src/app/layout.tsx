import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { outfit } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pickezee",
  description: "E-commerce Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
