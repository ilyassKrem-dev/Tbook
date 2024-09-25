"use client"
import { useLoginInfo } from "@/assets/Wrappers/sessionWrapper";
import Home from "@/components/home/Home";
import NoAuth from "@/components/home/noAuth/noAuth";
import { UserType } from "@/lib/utils/types/user";
export default function Page() {
  const {user,loginStatus} = useLoginInfo()
  
  return (
    <>
      {loginStatus=="unauthenticated"
      ?
      <NoAuth />
      :
      <Home user={user as UserType}/>
      }
    
    </>
  );
}
