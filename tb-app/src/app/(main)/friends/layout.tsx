import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { SocketProvider } from "@/assets/Wrappers/socketWrapper";
import "../../globals.css";
import { ToastProvider } from "@/assets/Wrappers/toastWrapper";
import AuthWrapper from "@/assets/Wrappers/authWrapper";
import { SessionWrapper } from "@/assets/Wrappers/sessionWrapper";
import { ConvoWrapper } from "@/assets/Wrappers/convoWrapper";
import { MediaWrapper } from "@/assets/Wrappers/mediaWrapper";
import TopNav from "@/shared/navTop/topNav";
import StoreProvider from "@/assets/Wrappers/reduxProvider";
const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tbook | Friends",
  description: "Tbook a social media website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={figtree.className + " h-screen bg-gray-1"}>
      <StoreProvider>
        <ToastProvider>
            <AuthWrapper >
              <SessionWrapper>
                <SocketProvider>
                  <MediaWrapper>
                    <ConvoWrapper>
                        <TopNav />
                        {children}
                    </ConvoWrapper>
                  </MediaWrapper>
                </SocketProvider>
              </SessionWrapper>
            </AuthWrapper>
          </ToastProvider>
      </StoreProvider>
      </body>
    </html>
  );
}
