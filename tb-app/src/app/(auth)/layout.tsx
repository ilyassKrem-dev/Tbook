import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "../globals.css";
import { ToastProvider } from "@/assets/Wrappers/toastWrapper";
import AuthWrapper from "@/assets/Wrappers/authWrapper";
import { SessionWrapper } from "@/assets/Wrappers/sessionWrapper";
const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tbook",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={figtree.className + " min-h-screen bg-gray-1"}
      >
        <ToastProvider>
          <AuthWrapper>
            <SessionWrapper>
             {children}
            </SessionWrapper>
          </AuthWrapper>
        </ToastProvider>
        
      </body>
    </html>
  );
}
