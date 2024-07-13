"use client"
import Login from "@/assets/account/login/login";
import { useSize } from "@/lib/utils/hooks";


export default function Page() {

const {h} = useSize()
  return (
    <div className={`flex flex-col overflow-y-auto ${h>470?"h-screen":"h-full"}`}>
       <div className="flex flex-col items-center gap-5 h-full justify-center">
            <Login />
       </div>
      
      {h>650&&<div className="bg-white  w-full text-center py-4 text-lg">
          &copy;IlyassKrem-dev
      </div>}
    </div>
  );
}