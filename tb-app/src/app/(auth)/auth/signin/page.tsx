"use client"
import SignUp from "@/assets/account/signin/signUp"
import { useSize } from "@/lib/utils/hooks";


export default function Page() {

const {h} = useSize()
  return (
    <div className={`flex flex-col overflow-y-auto ${h>650?"h-screen":"h-full"}`}>
      <SignUp />
      {h>650&&<div className="bg-white  w-full text-center py-4 text-lg">
          &copy;IlyassKrem-dev
      </div>}
    </div>
  );
}