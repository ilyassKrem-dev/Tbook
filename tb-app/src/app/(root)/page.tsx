"use client"
import { loginInfo } from "@/assets/Wrappers/sessionWrapper";
import Home from "@/components/home/Home";
import NoAuth from "@/components/home/noAuth/noAuth";

export default function Page() {
  const {user,loginStatus} = loginInfo()
  return (
    <>
      {loginStatus=="unauthenticated"
      ?
      <NoAuth />
      :
      <Home />
      }
    
    </>
  );
}
