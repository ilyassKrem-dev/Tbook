import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { SocketProvider } from "@/assets/Wrappers/socketWrapper";
import "../../globals.css";
import { ToastProvider } from "@/assets/Wrappers/toastWrapper";
import AuthWrapper from "@/assets/Wrappers/authWrapper";
import { SessionWrapper } from "@/assets/Wrappers/sessionWrapper";
import { ConvoWrapper } from "@/assets/Wrappers/convoWrapper";
import StoreProvider from "@/assets/Wrappers/reduxProvider";
import { MediaWrapper } from "@/assets/Wrappers/mediaWrapper";
import TopNav from "@/shared/navTop/topNav";
import LeftSideSharedMsg from "@/components/messages/shared/LeftSide";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tbook | messsages",
  description: "View your messages in Tbook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={figtree.className + " h-screen bg-gray-1"}>
      <ToastProvider>
          <AuthWrapper >
            <SessionWrapper>
              <SocketProvider>
                <StoreProvider>
                  <MediaWrapper>
                      <div>
                        <TopNav/>
                        <div className="pt-14 h-screen">
                          <div className="flex h-full">
                              <LeftSideSharedMsg />
                              {children}
                          </div>
                          
                        </div>
                      </div>
                  </MediaWrapper>

                </StoreProvider>
              </SocketProvider>
            </SessionWrapper>
          </AuthWrapper>
        </ToastProvider>
      </body>
    </html>
  );
}
