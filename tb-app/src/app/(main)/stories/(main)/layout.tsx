import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { SocketProvider } from "@/assets/Wrappers/socketWrapper";
import "../../../globals.css";
import { ToastProvider } from "@/assets/Wrappers/toastWrapper";
import AuthWrapper from "@/assets/Wrappers/authWrapper";
import { SessionWrapper } from "@/assets/Wrappers/sessionWrapper";
import StoreProvider from "@/assets/Wrappers/reduxProvider";
import TopNav from "@/shared/navTop/topNav";
import LeftSideMainStory from "@/components/stories/shared/main/leftSideMain";
const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tbook | stories",
  description: "View your story or others stories",
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
                    <div>
                      <TopNav />
                      <div className="flex flex-col md:flex-row h-screen">
                        <div className="md:w-[350px] md:h-screen w-full h-[122px] pt-16">
                          <LeftSideMainStory/>
                        </div>
                        <div className="flex-1 h-full ">
                          {children}
                        </div>
                        
                      </div>
                      
                    </div>
                  </SocketProvider>
                </SessionWrapper>
              </AuthWrapper>
            </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
